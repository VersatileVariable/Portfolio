// Simplified terminal.js version for debugging
// This version has minimal dependencies and should work in most environments

class SimpleTerminal {
    constructor(container) {
      this.container = container;
      this.init();
    }
  
    init() {
      // Create terminal elements
      this.container.innerHTML = '';
      this.container.style.backgroundColor = '#1a1a1a';
      this.container.style.color = '#33ff33';
      this.container.style.fontFamily = 'monospace';
      this.container.style.padding = '10px';
      this.container.style.overflow = 'auto';
      
      // Create header
      const header = document.createElement('div');
      header.style.backgroundColor = '#333';
      header.style.padding = '5px';
      header.style.borderTopLeftRadius = '5px';
      header.style.borderTopRightRadius = '5px';
      header.style.marginBottom = '10px';
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      
      // Create terminal circles
      const circles = document.createElement('div');
      circles.style.display = 'flex';
      circles.style.gap = '5px';
      
      ['#ff5f56', '#ffbd2e', '#27c93f'].forEach(color => {
        const circle = document.createElement('div');
        circle.style.width = '12px';
        circle.style.height = '12px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = color;
        circles.appendChild(circle);
      });
      
      const title = document.createElement('div');
      title.style.marginLeft = '10px';
      title.style.color = '#ccc';
      title.textContent = 'anna@portfolio:~';
      
      header.appendChild(circles);
      header.appendChild(title);
      this.container.appendChild(header);
      
      // Create terminal content
      this.content = document.createElement('div');
      this.container.appendChild(this.content);
      
      // Add welcome message
      this.addLine("Welcome to Anna Galeano's Interactive Terminal", 'system');
      this.addLine("Type 'help' to see available commands", 'system');
      
      // Create input line
      this.inputLine = document.createElement('div');
      this.inputLine.style.display = 'flex';
      this.inputLine.style.alignItems = 'center';
      this.inputLine.style.marginTop = '10px';
      
      const prompt = document.createElement('span');
      prompt.textContent = '$ ';
      prompt.style.color = '#33ff33';
      this.inputLine.appendChild(prompt);
      
      this.input = document.createElement('input');
      this.input.style.backgroundColor = 'transparent';
      this.input.style.border = 'none';
      this.input.style.outline = 'none';
      this.input.style.color = '#33ff33';
      this.input.style.fontFamily = 'monospace';
      this.input.style.fontSize = '14px';
      this.input.style.width = '100%';
      this.input.style.caretColor = '#33ff33';
      this.input.addEventListener('keydown', this.handleInput.bind(this));
      
      this.inputLine.appendChild(this.input);
      this.container.appendChild(this.inputLine);
      
      // Focus the input
      this.input.focus();
      
      // Define commands
      this.commands = {
        help: () => {
          this.addLine('Available commands:', 'output');
          this.addLine('  about       - Learn about me', 'output');
          this.addLine('  skills      - View my technical skills', 'output');
          this.addLine('  experience  - Show my work experience', 'output');
          this.addLine('  projects    - List my notable projects', 'output');
          this.addLine('  research    - View my research publications', 'output');
          this.addLine('  resume      - Download my resume', 'output');
          this.addLine('  contact     - Show my contact information', 'output');
          this.addLine('  clear       - Clear the terminal', 'output');
        },
        about: () => {
          this.addLine('━━━ ABOUT ME ━━━', 'heading');
          this.addLine("I'm Anna Galeano, a Computer Science student at Clemson University.", 'output');
          this.addLine("I specialize in data science, web development, and human-AI teaming.", 'output');
          this.addLine("My passion lies in creating AI systems that augment human capabilities", 'output');
          this.addLine("while maintaining a deep understanding of human factors.", 'output');
        },
        skills: () => {
          this.addLine('━━━ TECHNICAL SKILLS ━━━', 'heading');
          this.addLine('• Research Areas: AI, Machine Learning, Computer Vision, Human-AI Interaction', 'output');
          this.addLine('• Languages: Java, C++, C, JavaScript, Python', 'output');
          this.addLine('• Tools: Linux, Applied Data Science, Web Development', 'output');
          this.addLine('• Domains: Additive Manufacturing, Research Methodologies', 'output');
          this.addLine('• Human Languages: English, German', 'output');
        },
        experience: () => {
          this.addLine('━━━ WORK EXPERIENCE ━━━', 'heading');
          this.addLine('• Clemson University TRACE Lab (Jan 2024 - Present)', 'output');
          this.addLine('  Research Assistant - Human-AI interaction experiments', 'output');
          this.addLine('• Clemson University Makerspace (Jan 2024 - May 2025)', 'output');
          this.addLine('  Corporate Liaison & Makerspace Intern', 'output');
          this.addLine('• Special Operations Command Europe (May 2024 - Aug 2024)', 'output');
          this.addLine('  Academic Intern - J6X, Computer Vision Implementation', 'output');
          this.addLine('• University of Arkansas at Little Rock (2021-2023)', 'output');
          this.addLine('  COVID-19 Database Specialist', 'output');
        },
        projects: () => {
          this.addLine('━━━ NOTABLE PROJECTS ━━━', 'heading');
          this.addLine('1. Human-AI Collaborative System', 'output');
          this.addLine('2. COVID-19 Misinformation Tracker', 'output');
          this.addLine('3. YOLOv8 Target Identification System', 'output');
          this.addLine('4. Interactive Portfolio Website', 'output');
        },
        research: () => {
          this.addLine('━━━ RESEARCH PUBLICATIONS ━━━', 'heading');
          this.addLine('• Human-AI Team Training (2024)', 'output');
          this.addLine('  Co-Author, DOI: 10.1177/10711813241274425', 'output');
          this.addLine('• COVID-19 Misinformation Analysis (2021)', 'output');
          this.addLine('  Co-Author, Social Network Analysis and Mining 11, Springer', 'output');
        },
        resume: () => {
          this.addLine('━━━ RESUME ━━━', 'heading');
          this.addLine('Downloading resume...', 'output');
          window.location.href = 'files/anna_galeano_resume.pdf';
        },
        contact: () => {
          this.addLine('━━━ CONTACT INFO ━━━', 'heading');
          this.addLine('• Email: agalean@clemson.edu', 'output');
          this.addLine('• LinkedIn: linkedin.com/in/connectedanna', 'output');
          this.addLine('• GitHub: github.com/annagaleano', 'output');
        },
        clear: () => {
          this.content.innerHTML = '';
        }
      };
    }
    
    addLine(text, type) {
      const line = document.createElement('div');
      line.textContent = text;
      line.style.marginBottom = '5px';
      
      if (type === 'system') {
        line.style.color = '#5b9bd5';
      } else if (type === 'input') {
        line.style.color = '#33ff33';
      } else if (type === 'output') {
        line.style.color = '#ddd';
      } else if (type === 'heading') {
        line.style.color = '#ffbd2e';
        line.style.fontWeight = 'bold';
        line.style.marginTop = '10px';
      }
      
      this.content.appendChild(line);
      this.container.scrollTop = this.container.scrollHeight;
    }
    
    handleInput(e) {
      if (e.key === 'Enter') {
        const command = this.input.value.trim().toLowerCase();
        
        if (command) {
          this.addLine(`$ ${command}`, 'input');
          
          if (this.commands[command]) {
            this.commands[command]();
          } else {
            this.addLine(`Command not found: ${command}. Type 'help' for available commands.`, 'output');
          }
        }
        
        this.input.value = '';
        this.container.scrollTop = this.container.scrollHeight;
      }
    }
  }
  
  // Initialize terminal when DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing terminal...');
    const container = document.getElementById('terminal-container');
    if (container) {
      console.log('Terminal container found, creating terminal...');
      new SimpleTerminal(container);
    } else {
      console.error('Terminal container not found!');
    }
  });