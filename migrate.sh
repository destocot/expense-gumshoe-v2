#!/bin/bash

folders=($(ls -d ./prisma/migrations/*/))

echo "Select a migration folder:"
for i in "${!folders[@]}"; do
  folder_name=$(basename "${folders[$i]}")
  echo "$((i+1))) $folder_name"
done

read -p "Enter the number of the folder you want to use: " choice

if [[ ! "$choice" =~ ^[0-9]+$ ]] || [ "$choice" -gt "${#folders[@]}" ] || [ "$choice" -lt 1 ]; then
  echo -e "\033[31mA migration failed to apply.\033[0m"
  exit 1
fi

selected_folder=$(basename "${folders[$((choice-1))]}")

echo "Applying migration `$selected_folder`"
turso db shell expenses-db-v2 < "./prisma/migrations/$selected_folder/migration.sql"
echo -e "\033[32mYour database is now in sync with your schema.\033[0m"
