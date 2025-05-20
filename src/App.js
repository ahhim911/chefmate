import React, { useEffect, useState, useRef } from 'react';
import './App.css';

// Import AOS for animations (we installed this earlier)
import AOS from 'aos';

// Import images
import edmond from './assets/img/team/edmond.png';
import kelvin from './assets/img/team/kelvin.png';
import rachael from './assets/img/team/rachael.png';
import jordan from './assets/img/team/jordan.png';
import jasper from './assets/img/team/jasper.png';
import chefLogo from './assets/img/chefmate_icon_word.png';
import heroImage from './assets/img/pexels-kindelmedia-6994189.jpg';
import fridgeimage from './assets/img/pexels-polina-tankilevitch-4443433.jpg';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navbarRef = useRef(null);
  
  // Handle scroll for navbar and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style on scroll
      setIsScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        // Only close if the click is outside and not on the toggle button
        if (!event.target.classList.contains('mobile-nav-toggle')) {
          setMobileNavOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileNavOpen]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileNavOpen]);

  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  // Set up smooth scrolling to center sections
  useEffect(() => {
    const handleNavClick = (e) => {
      const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Get the target section
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            // Get header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            // Calculate position to center the section
            const windowHeight = window.innerHeight;
            const sectionHeight = targetSection.offsetHeight;
            let scrollPosition;
            
            // If section is taller than viewport, scroll to top with header offset
            // Otherwise, center it in the viewport
            if (sectionHeight > windowHeight - headerHeight) {
              scrollPosition = targetSection.offsetTop - headerHeight;
            } else {
              scrollPosition = targetSection.offsetTop - (windowHeight - sectionHeight) / 2;
              // Ensure we don't scroll above the section accounting for header
              scrollPosition = Math.max(scrollPosition, targetSection.offsetTop - headerHeight);
            }
            
            // Smooth scroll to position
            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileNavOpen) {
              setMobileNavOpen(false);
              document.body.style.overflow = 'auto';
              document.body.classList.remove('mobile-nav-active');
            }
          }
        });
      });
    };
    
    handleNavClick();
    
    // Cleanup event listeners
    return () => {
      const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, [mobileNavOpen]);

  // Toggle mobile menu
  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
    // If opening the menu, prevent body scrolling
    if (!mobileNavOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-nav-active');
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('mobile-nav-active');
    }
  };

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMobileNavOpen(false);
    document.body.style.overflow = 'auto';
    document.body.classList.remove('mobile-nav-active');
  };

  return (
    <div className="App">
      {/* Navigation */}
      <header className={`header fixed-top ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="#hero">
              <img src={chefLogo} alt="ChefMate Logo" height="40" />
            </a>
          </h1>
          
          <nav ref={navbarRef} className={`navbar ${mobileNavOpen ? 'navbar-mobile' : ''}`}>
            <ul>
              <li><a className={`nav-link scrollto ${activeSection === 'hero' ? 'active' : ''}`} href="#hero" onClick={handleNavLinkClick}>Home</a></li>
              <li><a className={`nav-link scrollto ${activeSection === 'problem' ? 'active' : ''}`} href="#problem" onClick={handleNavLinkClick}>Problem</a></li>
              <li><a className={`nav-link scrollto ${activeSection === 'causes' ? 'active' : ''}`} href="#causes" onClick={handleNavLinkClick}>Causes</a></li>
              <li><a className={`nav-link scrollto ${activeSection === 'solution' ? 'active' : ''}`} href="#solution" onClick={handleNavLinkClick}>Solution</a></li>
              <li><a className={`nav-link scrollto ${activeSection === 'team' ? 'active' : ''}`} href="#team" onClick={handleNavLinkClick}>Team</a></li>
              <li><a className={`nav-link scrollto ${activeSection === 'about' ? 'active' : ''}`} href="#about" onClick={handleNavLinkClick}>About</a></li>
              <li><a className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`} href="#contact" onClick={handleNavLinkClick}>Get Started</a></li>
            </ul>
            {mobileNavOpen && <i className="bi bi-x mobile-nav-toggle" onClick={toggleMobileNav}></i>}
          </nav>
          {!mobileNavOpen && <i className="bi bi-list mobile-nav-toggle" onClick={toggleMobileNav}></i>}
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-overlay"></div>
        <img src={heroImage} alt="Open refrigerator with healthy food" />
        
        <div className="hero-content centered" data-aos="fade-up">
          <div className="hero-logo">
            <img src={chefLogo} alt="ChefMate Logo" />
          </div>
          {/* <h1 className="hero-title">CHEFMATE</h1> */}
          <p className="hero-tagline">YOUR FRIDGE, BUT SMARTER</p>
        </div>
      </section>

      {/* Problem Statistics Section */}
      <section id="problem" className="stats-section light-background">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>The Food Waste Problem</h2>
            <p>Every year, a staggering amount of food is wasted in households around the world</p>
          </div>

          <div className="stats-container" data-aos="fade-up" data-aos-delay="100">
            <div className="stats-item">
              <i className="bi bi-trash"></i>
              <h3>7.6 million</h3>
              <p>Tons of food wasted in Australia every year</p>
            </div>

            <div className="stats-item">
              <i className="bi bi-cash-coin"></i>
              <h3>$2,500</h3>
              <p>Average annual cost of food waste per Australian household</p>
            </div>

            <div className="stats-item">
              <i className="bi bi-globe-americas"></i>
              <h3>8-10%</h3>
              <p>Of global greenhouse gas(GHG) emissions associated with food waste</p>
            </div>

            <div className="stats-item">
              <i className="bi bi-exclamation-triangle"></i>
              <h3>60%</h3>
              <p>Of all food wasted are by households</p>
            </div>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section id="causes" className="causes-section">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Why Do We Waste Food?</h2>
            <p>Understanding the root causes helps us create effective solutions</p>
          </div>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6">
              <div className="cause-item">
                <div className="icon"><i className="bi bi-calendar-x"></i></div>
                <h3>Poor Planning</h3>
                <p>Buying too much food without meal planning leads to unused ingredients that expire before use.</p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="cause-item">
                <div className="icon"><i className="bi bi-eye-slash"></i></div>
                <h3>Out of Sight, Out of Mind</h3>
                <p>Food pushed to the back of the refrigerator is forgotten until it's too late.</p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="cause-item">
                <div className="icon"><i className="bi bi-question-circle"></i></div>
                <h3>Date Label Confusion</h3>
                <p>Misunderstanding "sell by," "best by," and "use by" dates leads to premature disposal.</p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="cause-item">
                <div className="icon"><i className="bi bi-basket"></i></div>
                <h3>Impulse Purchases</h3>
                <p>Buying food without a specific plan for using it often results in waste.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section id="solution" className="solution-section accent-background">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Our Solution</h2>
            <p>ChefMate transforms how you interact with your refrigerator</p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" className="img-fluid solution-image" alt="Smart device tracking food" />
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="solution-features">
                <div className="feature-item">
                  <i className="bi bi-camera"></i>
                  <h3>Smart Scanning</h3>
                  <p>Automatically track what enters and leaves your fridge with our innovative scanning technology.</p>
                </div>
                <div className="feature-item">
                  <i className="bi bi-alarm"></i>
                  <h3>Expiration Alerts</h3>
                  <p>Receive timely notifications before your food goes bad, prioritizing items that need to be used soon.</p>
                </div>
                <div className="feature-item">
                  <i className="bi bi-book"></i>
                  <h3>Recipe Suggestions</h3>
                  <p>Get personalized recipe ideas based on what's already in your fridge to minimize waste.</p>
                </div>
                <div className="feature-item">
                  <i className="bi bi-graph-up"></i>
                  <h3>Waste Analytics</h3>
                  <p>Track your progress in reducing food waste and saving money over time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section light-background">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Our Team</h2>
            <p>Meet the passionate innovators behind ChefMate</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-2 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay="100">
              <div className="team-member">
                <div className="member-img">
                  <img src={jordan} className="img-fluid" alt="Team Member" />
                </div>
                <div className="member-info">
                  <h4>Jordan</h4>
                  <span>CEO & Founder</span>
                  <p>Food tech enthusiast with a background in sustainability.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay="200">
              <div className="team-member">
                <div className="member-img">
                  <img src={jasper} className="img-fluid" alt="Team Member" />
                </div>
                <div className="member-info">
                  <h4>Jasper</h4>
                  <span>CTO</span>
                  <p>AI specialist with expertise in computer vision.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay="400">
              <div className="team-member">
                <div className="member-img">
                  <img src={kelvin} className="img-fluid" alt="Team Member" />
                </div>
                <div className="member-info">
                  <h4>Kelvin</h4>
                  <span>Head of Machine Learning</span>
                  <p>AI expert with a focus on machine learning and data analysis.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay="300">
              <div className="team-member">
                <div className="member-img">
                  <img src={edmond} className="img-fluid" alt="Edmond" />
                </div>
                <div className="member-info">
                  <h4>Edmond</h4>
                  <span>Head of Design</span>
                  <p>UX/UI designer with expertise in user-centered interfaces.</p>
                </div>
              </div>
            </div>

            
            <div className="col-lg-2 col-md-6 col-sm-10" data-aos="fade-up" data-aos-delay="500">
              <div className="team-member">
                <div className="member-img">
                  <img src={rachael} className="img-fluid" alt="Team Member" />
                </div>
                <div className="member-info">
                  <h4>Rachael</h4>
                  <span>Product Manager</span>
                  <p>Expert in consumer products with a focus on food-tech solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="about-content">
                <h2>About ChefMate</h2>
                <p className="highlight">We're on a mission to revolutionize how people interact with their refrigerators and reduce global food waste.</p>
                <p>Founded in 2023, ChefMate was born from a simple observation: despite our best intentions, most of us waste food regularly because we lack the tools to effectively manage what's in our refrigerator.</p>
                <p>Our team of food lovers, technologists, and environmental advocates came together to create a solution that makes it easy and intuitive to track food, reduce waste, and save money in the process.</p>
                <div className="about-stats">
                  <div className="stat-item">
                    <h3>25,000+</h3>
                    <p>Users</p>
                  </div>
                  <div className="stat-item">
                    <h3>$3.2M</h3>
                    <p>Customer Savings</p>
                  </div>
                  <div className="stat-item">
                    <h3>450 tons</h3>
                    <p>Food Saved</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="about-image">
                <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80" className="img-fluid" alt="Fresh vegetables" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer dark-background">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-info">
                <h3>
                  <img src={chefLogo} alt="ChefMate Logo" height="40" />
                </h3>
                <p>
                  123 Innovation Drive <br />
                  San Francisco, CA 94105<br /><br />
                  <strong>Phone:</strong> +1 (555) 123-4567<br />
                  <strong>Email:</strong> info@chefmate.com<br />
                </p>
                <div className="social-links">
                  <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="#hero">Home</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#about">About us</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#solution">Features</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Food Tracking</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Expiration Management</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Recipe Suggestions</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Shopping Assistance</a></li>
                <li><i className="bi bi-chevron-right"></i> <a href="#">Waste Analytics</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>Stay updated with the latest features, tips, and food waste reduction strategies</p>
              <form>
                <input type="email" name="email" placeholder="Your email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="copyright-text">
              &copy; {new Date().getFullYear()} <strong>ChefMate</strong>. All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
