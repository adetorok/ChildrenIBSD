// Language Management
let currentLanguage = 'en';

// Check if language was previously selected
document.addEventListener('DOMContentLoaded', function() {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
    document.getElementById('languageModal').classList.add('hidden');
    updateLanguage();
  } else {
    // Show language modal on first visit
    document.getElementById('languageModal').classList.remove('hidden');
  }
});

function selectLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('selectedLanguage', lang);
  document.getElementById('languageModal').classList.add('hidden');
  updateLanguage();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
  localStorage.setItem('selectedLanguage', currentLanguage);
  updateLanguage();
}

function updateLanguage() {
  // Update all elements with data attributes
  const elements = document.querySelectorAll('[data-en][data-es]');
  elements.forEach(element => {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      // Handle placeholders for input elements
      if (element.hasAttribute('data-placeholder-en') && element.hasAttribute('data-placeholder-es')) {
        element.placeholder = currentLanguage === 'en' ? 
          element.getAttribute('data-placeholder-en') : 
          element.getAttribute('data-placeholder-es');
      }
    } else {
      // Handle text content for other elements
      element.textContent = currentLanguage === 'en' ? 
        element.getAttribute('data-en') : 
        element.getAttribute('data-es');
    }
  });

  // Update select options
  const selectOptions = document.querySelectorAll('option[data-en][data-es]');
  selectOptions.forEach(option => {
    option.textContent = currentLanguage === 'en' ? 
      option.getAttribute('data-en') : 
      option.getAttribute('data-es');
  });

  // Update language toggle button
  document.getElementById('currentLanguage').textContent = currentLanguage.toUpperCase();
  
  // Update page direction if needed
  document.documentElement.lang = currentLanguage;
  if (currentLanguage === 'es') {
    document.documentElement.dir = 'ltr'; // Spanish is left-to-right
  }
}

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
});

// Form Submission Handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('qualificationForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = {
        parentName: formData.get('parentName'),
        childName: formData.get('childName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        childAge: formData.get('childAge')
      };
      
      // Validate form
      if (!data.parentName || !data.childName || !data.email || !data.phone || !data.childAge) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Validate phone format (basic)
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return;
      }
      
      // Show loading state
      const submitButton = form.querySelector('.cta-button');
      const originalText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Show success overlay
        document.getElementById('successOverlay').classList.remove('hidden');
        
        // Reset form
        form.reset();
        
        // Auto-hide overlay after 4 seconds
        setTimeout(() => {
          document.getElementById('successOverlay').classList.add('hidden');
        }, 4000);
        
        // In a real implementation, you would send the data to your server:
        // fetch('/api/qualification', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //   // Handle success
        // })
        // .catch(error => {
        //   // Handle error
        // });
        
      }, 2000);
    });
  }
});

// Smooth scrolling for sticky button
document.addEventListener('DOMContentLoaded', function() {
  const stickyButton = document.querySelector('.sticky-button');
  
  if (stickyButton) {
    stickyButton.addEventListener('click', function() {
      const form = document.getElementById('qualificationForm');
      if (form) {
        form.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  }
});

// Add scroll effect to sticky button
window.addEventListener('scroll', function() {
  const stickyButton = document.querySelector('.sticky-button');
  const hero = document.querySelector('.hero');
  
  if (stickyButton && hero) {
    const heroHeight = hero.offsetHeight;
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > heroHeight * 0.5) {
      stickyButton.style.opacity = '1';
      stickyButton.style.visibility = 'visible';
    } else {
      stickyButton.style.opacity = '0';
      stickyButton.style.visibility = 'hidden';
    }
  }
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.included-card, .eligibility-content > *, .faq-item, .contact-content > *');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
  const phoneInput = document.getElementById('phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
      }
      
      e.target.value = value;
    });
  }
});

// Add focus effects to form inputs
document.addEventListener('DOMContentLoaded', function() {
  const formInputs = document.querySelectorAll('.form-group input, .form-group select');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});
