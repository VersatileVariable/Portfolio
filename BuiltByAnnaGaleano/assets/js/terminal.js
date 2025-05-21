// Terminal Script for Anna Galeano's Portfolio
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, checking for terminal container...');
  
  // Check if the terminal container exists
  const terminalContainer = document.getElementById('terminal-container');
  
  if (terminalContainer) {
      console.log('Terminal container found, initializing...');
      
      // Clear any existing content
      terminalContainer.innerHTML = '';
      
      // Create terminal header
      const header = document.createElement('div');
      header.className = 'terminal-header';
      header.textContent = 'anna@portfolio:~';
      terminalContainer.appendChild(header);
      
      // Create content area
      const content = document.createElement('div');
      content.className = 'terminal-content';
      terminalContainer.appendChild(content);
      
      // Add welcome message
      addLine(content, "Welcome to Anna Galeano's Interactive Terminal", 'system');
      addLine(content, "Type 'help' to see available commands", 'system');
      
      // Command history tracking
      let commandHistory = [];
      let historyIndex = -1;
      
      // Create input area
      const inputLine = document.createElement('div');
      inputLine.className = 'terminal-input-line';
      
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = ';
      inputLine.appendChild(prompt);
      
      const input = document.createElement('input');
      input.className = 'terminal-input';
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.placeholder = ''; // Clear placeholder
      
      // Handle input events
      input.addEventListener('keydown', function(e) {
          // Handle arrow keys for command history
          if (e.key === 'ArrowUp') {
              e.preventDefault();
              if (commandHistory.length > 0) {
                  historyIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                  input.value = commandHistory[commandHistory.length - 1 - historyIndex];
                  // Move cursor to end
                  setTimeout(() => {
                      input.selectionStart = input.value.length;
                      input.selectionEnd = input.value.length;
                  }, 0);
              }
              return;
          } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              if (historyIndex > 0) {
                  historyIndex--;
                  input.value = commandHistory[commandHistory.length - 1 - historyIndex];
              } else if (historyIndex === 0) {
                  historyIndex = -1;
                  input.value = '';
              }
              return;
          }
          
          // Process command on Enter
          if (e.key === 'Enter') {
              const command = input.value.trim().toLowerCase();
              
              if (command) {
                  // Add to history (avoid duplicates at the end)
                  if (commandHistory.length === 0 || 
                      commandHistory[commandHistory.length - 1] !== command) {
                      commandHistory.push(command);
                  }
                  historyIndex = -1;
                  
                  // Display command
                  addLine(content, `$ ${command}`, 'input');
                  
                  // Process commands
                  processCommand(content, command);
              }
              
              input.value = '';
              scrollToBottom();
          }
      });
      
      inputLine.appendChild(input);
      terminalContainer.appendChild(inputLine);
      
      // Focus the input
      setTimeout(function() {
          input.focus();
      }, 100);
      
      // Refocus input when clicking on terminal
      terminalContainer.addEventListener('click', function(e) {
          if (e.target !== input) {
              input.focus();
          }
      });
      
      // Function to scroll to the bottom of the terminal
      function scrollToBottom() {
          content.scrollTop = content.scrollHeight;
      }
      
      // Function to process commands
      function processCommand(content, command) {
          switch(command) {
              case 'help':
                  addLine(content, '━━━ AVAILABLE COMMANDS ━━━', 'heading');
                  addLine(content, '  about       - Learn about me', 'output');
                  addLine(content, '  skills      - View my technical skills', 'output');
                  addLine(content, '  experience  - Show my work experience', 'output');
                  addLine(content, '  projects    - List my notable projects', 'output');
                  addLine(content, '  research    - View my research publications', 'output');
                  addLine(content, '  resume      - Download my resume', 'output');
                  addLine(content, '  contact     - Show my contact information', 'output');
                  addLine(content, '  clear       - Clear the terminal', 'output');
                  break;
                  
              case 'about':
                  addLine(content, '━━━ ABOUT ME ━━━', 'heading');
                  addLine(content, "I'm Anna Galeano, a Computer Science student at Clemson University.", 'output');
                  addLine(content, "I specialize in data science, web development, and human-AI teaming.", 'output');
                  addLine(content, "My passion lies in creating AI systems that augment human capabilities", 'output');
                  addLine(content, "while maintaining a deep understanding of human factors.", 'output');
                  break;
                  
              case 'skills':
                  addLine(content, '━━━ TECHNICAL SKILLS ━━━', 'heading');
                  addLine(content, '• Research Areas: AI, Machine Learning, Computer Vision, Human-AI Interaction', 'output');
                  addLine(content, '• Languages: Java, C++, C, JavaScript, Python', 'output');
                  addLine(content, '• Tools: Linux, Applied Data Science, Web Development', 'output');
                  addLine(content, '• Domains: Additive Manufacturing, Research Methodologies', 'output');
                  addLine(content, '• Human Languages: English, German', 'output');
                  break;
                  
              case 'experience':
                  addLine(content, '━━━ WORK EXPERIENCE ━━━', 'heading');
                  addLine(content, '• Clemson University TRACE Lab (Jan 2024 - Present)', 'output');
                  addLine(content, '  Research Assistant - Human-AI interaction experiments', 'output');
                  addLine(content, '• Clemson University Makerspace (Jan 2024 - May 2025)', 'output');
                  addLine(content, '  Corporate Liaison & Makerspace Intern', 'output');
                  addLine(content, '• Special Operations Command Europe (May 2024 - Aug 2024)', 'output');
                  addLine(content, '  Academic Intern - J6X, Computer Vision Implementation', 'output');
                  addLine(content, '• University of Arkansas at Little Rock (2021-2023)', 'output');
                  addLine(content, '  COVID-19 Database Specialist', 'output');
                  break;
                  
              case 'projects':
                  addLine(content, '━━━ NOTABLE PROJECTS ━━━', 'heading');
                  addLine(content, '1. Chagas Disease Detection', 'output');
                  addLine(content, '   Machine learning system for 12-lead ECG data analysis', 'output');
                  addLine(content, '2. Security Breadcrumbs Analyzer', 'output');
                  addLine(content, '   Web scraping and analysis of LinkedIn profiles', 'output');
                  addLine(content, '3. Command-Line Checkers', 'output');
                  addLine(content, '   Text-based checkers game with AI opponent', 'output');
                  addLine(content, '4. Interactive Portfolio Website', 'output');
                  addLine(content, '   Responsive web design with terminal emulation', 'output');
                  break;
                  
              case 'research':
                  addLine(content, '━━━ RESEARCH PUBLICATIONS ━━━', 'heading');
                  addLine(content, '• Human-AI Team Training (2024)', 'output');
                  addLine(content, '  Co-Author, DOI: 10.1177/10711813241274425', 'output');
                  addLine(content, '• COVID-19 Misinformation Analysis (2021)', 'output');
                  addLine(content, '  Co-Author, Social Network Analysis and Mining 11, Springer', 'output');
                  break;
                  
              case 'resume':
                  addLine(content, '━━━ RESUME ━━━', 'heading');
                  addLine(content, 'Downloading resume...', 'output');
                  window.location.href = 'files/anna_galeano_resume.pdf';
                  break;
                  
              case 'contact':
                  addLine(content, '━━━ CONTACT INFO ━━━', 'heading');
                  addLine(content, '• Email: agalean@clemson.edu', 'output');
                  addLine(content, '• LinkedIn: linkedin.com/in/connectedanna', 'output');
                  addLine(content, '• GitHub: github.com/VersatileVariable', 'output');
                  break;
                  
              case 'clear':
                  // Clear all content except the welcome message
                  content.innerHTML = '';
                  addLine(content, "Welcome to Anna Galeano's Interactive Terminal", 'system');
                  addLine(content, "Type 'help' to see available commands", 'system');
                  break;
                  
              default:
                  addLine(content, `Command not found: ${command}. Type 'help' for available commands.`, 'error');
          }
          
          // Auto-scroll to the bottom
          scrollToBottom();
      }
  } else {
      console.error('Terminal container not found!');
  }
});

// Helper function to add a line to the terminal
function addLine(content, text, type) {
  const line = document.createElement('div');
  line.textContent = text;
  line.className = `${type}-text`;
  content.appendChild(line);
}