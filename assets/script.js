document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files;
    if (files.length > 0) {
      const fileTree = buildFileTree(files);
      const output = displayFileTree(fileTree);
      const fileTreeElement = document.getElementById('fileTree');
      fileTreeElement.textContent = output;
      const fileTreeContainer = document.getElementById('fileTreeContainer');
      fileTreeContainer.style.display = 'block';
      adjustCodeBlockSize(fileTreeElement);
    }
  });
  
  document.getElementById('copyButton').addEventListener('click', function () {
    const fileTreeElement = document.getElementById('fileTree');
    const range = document.createRange();
    range.selectNodeContents(fileTreeElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showCopiedText();
      }
    } catch (err) {
      console.error('无法复制文本', err);
    }
    selection.removeAllRanges();
  });
  
  document.getElementById('fileTreeContainer').addEventListener('scroll', function () {
    const arrowButton = document.getElementById('arrowButton');
    if (this.scrollTop > 100) {
      arrowButton.style.display = 'block';
    } else {
      arrowButton.style.display = 'none';
    }
  });
  
  document.getElementById('arrowButton').addEventListener('click', function () {
    const fileTreeContainer = document.getElementById('fileTreeContainer');
    fileTreeContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  function buildFileTree(files) {
    const fileTree = {};
    for (const file of files) {
      const path = file.webkitRelativePath.split('/');
      let currentDir = fileTree;
      for (let i = 0; i < path.length; i++) {
        const folder = path[i];
        if (!currentDir[folder]) {
          currentDir[folder] = i === path.length - 1 ? null : {};
        }
        currentDir = currentDir[folder];
      }
    }
    return fileTree;
  }
  
  function displayFileTree(fileTree, indent = 0) {
    let output = '';
    for (const folder in fileTree) {
      output += '  '.repeat(indent);
      if (indent > 0) {
        output += '├─ ';
      }
      output += folder + '\n';
      if (fileTree[folder] !== null) {
        output += displayFileTree(fileTree[folder], indent + 1);
      }
    }
    return output;
  }
  
  function adjustCodeBlockSize(element) {
    element.style.width = 'auto';
    element.style.width = (element.scrollWidth + 20) + 'px';
  }
  
  function showCopiedText() {
    const copiedTextElement = document.getElementById('copiedText');
    copiedTextElement.style.display = 'inline';
    setTimeout(() => {
      copiedTextElement.style.display = 'none';
    }, 2000);
  }
  
  document.addEventListener('scroll', function () {
    const arrowButton = document.getElementById('arrowButton');
    const fileTreeContainer = document.getElementById('fileTreeContainer');
    if (fileTreeContainer.scrollTop > 100) {
      arrowButton.style.display = 'block';
    } else {
      arrowButton.style.display = 'none';
    }
  });
  
  document.getElementById('arrowButton').addEventListener('click', function () {
    const fileTreeContainer = document.getElementById('fileTreeContainer');
    fileTreeContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  