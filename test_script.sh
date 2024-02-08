#!/bin/bash

echo "Changing into thekre_webportal folder... Will created if not exists."
cd thekre_webportal || { sudo mkdir thekre_webportal && cd thekre_webportal || { echo "Error: Unable to create or change into thekre_webportal folder"; exit 1; } }
echo "Folder 'thekre_webportal' switched to."