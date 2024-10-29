import os
import shutil

def move_mdx_files(directory):
    current_dir = os.path.join(directory, 'current')
    
    for root, dirs, files in os.walk(current_dir):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                destination = os.path.join(current_dir, file)
                
                # If a file with the same name already exists in the destination,
                # append a number to the filename
                if os.path.exists(destination):
                    base, extension = os.path.splitext(file)
                    counter = 1
                    while os.path.exists(destination):
                        new_file = f"{base}_{counter}{extension}"
                        destination = os.path.join(current_dir, new_file)
                        counter += 1
                
                # Move the file
                shutil.move(file_path, destination)
                print(f"Moved {file_path} to {destination}")

# Use the directory where your 'current' folder is located
move_mdx_files('/Users/hengma/Documents/GitHub/risingwave-docs-new/docs')