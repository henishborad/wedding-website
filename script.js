// Global variables
// No admin functionality needed

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1vGaWjiNYRU1j0lxSjpbUhBeP1fbc4pg",
  authDomain: "wedding-rsvp-6a2e9.firebaseapp.com",
  projectId: "wedding-rsvp-6a2e9",
  storageBucket: "wedding-rsvp-6a2e9.firebasestorage.app",
  messagingSenderId: "506604661121",
  appId: "1:506604661121:web:3ce481713d759e25d36080"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    

    
    // Countdown Timer
    const weddingDate = new Date('August 16, 2025 08:00:00').getTime();
    const countdownTimer = document.querySelector('.countdown-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Wedding day has arrived!
            countdownTimer.innerHTML = `
                <div class="wedding-day-message">
                    🎉 Today is the big day! 🎉
                </div>`;
        }
    }

    // Update countdown immediately and every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // RSVP Form Validation
    const rsvpForm = document.getElementById('rsvpForm');
    const attendanceSelect = document.getElementById('attendance');
    const guestCountGroup = document.getElementById('guestCountGroup');
    const rsvpMessage = document.getElementById('rsvpMessage');

    attendanceSelect.addEventListener('change', function() {
        const isAttending = this.value === 'yes';
        guestCountGroup.style.display = isAttending ? 'block' : 'none';
        document.getElementById('guestCount').required = isAttending;
    });

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const attendance = formData.get('attendance');
        
        const rsvpData = {
            guestName: formData.get('guestName'),
            email: formData.get('email'),
            attendance: attendance,
            // Set guestCount to 0 if not attending, otherwise use the selected value
            // Parse to integer to ensure it's stored as a number, not a string
            guestCount: attendance === 'no' ? 0 : parseInt(formData.get('guestCount') || 1, 10),
            message: formData.get('message') || '',
            dateSubmitted: firebase.firestore.Timestamp.now()
        };

        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rsvpData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Save to Firebase
        saveRsvpToFirestore(rsvpData)
            .then(() => {
                showMessage('RSVP submitted successfully!', 'success');
                rsvpForm.reset();
            })
            .catch(error => {
                console.error("Error adding RSVP: ", error);
                showMessage('Error saving RSVP. Please try again.', 'error');
            });
    });

    function showMessage(text, type) {
        rsvpMessage.textContent = text;
        rsvpMessage.className = `rsvp-message ${type}`;
        rsvpMessage.style.display = 'block';
        setTimeout(() => rsvpMessage.style.display = 'none', 5000);
    }

    // Photo Gallery
    const photoModal = document.getElementById('photoModal');
    const modalContent = document.querySelector('.modal-content');
    const photoData = [
        { emoji: '☕', title: 'First Date', caption: 'Coffee shop downtown' },
        { emoji: '🏔️', title: 'Yosemite Adventure', caption: 'Hiking Half Dome' },
        { emoji: '💍', title: 'The Proposal', caption: 'Golden Gate Bridge' },
        { emoji: '🎉', title: 'Engagement Party', caption: 'Family celebration' },
        { emoji: '🇮🇹', title: 'Italy Trip', caption: 'Cinque Terre views' },
        { emoji: '👨‍🍳', title: 'Cooking Class', caption: 'Making pasta together' }
    ];

    document.querySelectorAll('.photo-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const photo = photoData[index];
            modalContent.querySelector('#modalEmoji').textContent = photo.emoji;
            modalContent.querySelector('#modalTitle').textContent = photo.title;
            modalContent.querySelector('#modalCaption').textContent = photo.caption;
            photoModal.style.display = 'block';
        });
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        photoModal.style.display = 'none';
    });

    // Admin functionality removed

    // Registry Links
    document.querySelectorAll('.registry-link').forEach(link => {
        link.addEventListener('click', () => {
            alert('Registry link opened in new tab');
        });
    });


    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navigation')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Sparkle Animation
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        document.querySelector('.hero').appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }, 500);
});

// Firestore Functions
async function saveRsvpToFirestore(rsvpData) {
    try {
        const docRef = await db.collection("rsvps").add(rsvpData);
        console.log("RSVP saved with ID: ", docRef.id);
        return docRef;
    } catch (error) {
        console.error("Error saving RSVP to Firestore: ", error);
        throw error;
    }
}

// Admin functionality removed

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Only keep non-admin functions available globally
window.copyToClipboard = copyToClipboard;
