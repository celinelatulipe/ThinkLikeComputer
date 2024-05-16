# Directory Structure

## RST Files
*   `_sources/`: The source files for the RST version of the textbook
*   `build/`: The output from the RST version of the textbook (will only appear locally)
*   `conf.py`: The file for configuring Sphinx, the build system for the RST version of the textbook
*   `pavement.py`: A local server script for testing/debugging the RST book
*   `sphinx_settings.json`: A file with some variables used by Sphinx

## PreTeXt Files
*   `assets/`: Assets for the PreTeXt version of the textbook
*   `output/`: The output from the PreTeXt version of the textbook (will only appear locally)
*   `publication/`: A file indicating how to deploy the textbook to Runestone
*   `source/`: **_The PreTeXt source code._**
*   `project.ptx`: The project definition file for the PreTeXt version of the textbook
