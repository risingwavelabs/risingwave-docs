import os
import shutil

def clean_and_rename(directory):
    current_dir = os.path.join(directory, 'current')
    
    # First, rename files ending with "_1"
    for filename in os.listdir(current_dir):
        if filename.endswith('_1.mdx'):
            old_path = os.path.join(current_dir, filename)
            new_filename = filename.replace('_1.mdx', '.mdx')
            new_path = os.path.join(current_dir, new_filename)
            
            # Check if the new filename already exists
            if not os.path.exists(new_path):
                os.rename(old_path, new_path)
                print(f"Renamed {old_path} to {new_path}")
            else:
                print(f"Skipped renaming {old_path} as {new_path} already exists")

    # Then, remove empty folders
    for root, dirs, files in os.walk(current_dir, topdown=False):
        for dir in dirs:
            dir_path = os.path.join(root, dir)
            if not os.listdir(dir_path):  # Check if the directory is empty
                os.rmdir(dir_path)
                print(f"Removed empty directory: {dir_path}")

# Use the directory where your 'current' folder is located
clean_and_rename('/Users/hengma/Documents/GitHub/risingwave-docs-new/docs')