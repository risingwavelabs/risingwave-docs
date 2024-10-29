import os
import shutil

def rename_and_move_files(directory):
    current_dir = os.path.join(directory, 'current')
    
    for root, dirs, files in os.walk(current_dir):
        if 'introduction.mdx' in files:
            old_path = os.path.join(root, 'introduction.mdx')
            folder_name = os.path.basename(root)
            new_name = folder_name + '.mdx'
            new_path = os.path.join(current_dir, new_name)
            
            # Rename and move the file
            shutil.move(old_path, new_path)
            print(f"Renamed and moved {old_path} to {new_path}")

# Use the directory where your 'current' folder is located
rename_and_move_files('/Users/hengma/Documents/GitHub/risingwave-docs-new/docs')
