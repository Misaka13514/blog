#!/bin/bash
wget 'https://github.com/jgm/pandoc/releases/download/2.11.3.1/pandoc-2.11.3.1-1-amd64.deb' -O 'pandoc.deb'
sudo dpkg -i pandoc.deb
rm pandoc.deb
