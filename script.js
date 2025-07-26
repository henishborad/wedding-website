// Global variable to track admin mode
let isAdmin = false;

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
    const dietaryGroup = document.getElementById('dietaryGroup');
    const rsvpMessage = document.getElementById('rsvpMessage');

    attendanceSelect.addEventListener('change', function() {
        const isAttending = this.value === 'yes';
        guestCountGroup.style.display = isAttending ? 'block' : 'none';
        dietaryGroup.style.display = isAttending ? 'block' : 'none';
        document.getElementById('guestCount').required = isAttending;
    });

    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const rsvpData = {
            guestName: formData.get('guestName'),
            email: formData.get('email'),
            attendance: formData.get('attendance'),
            guestCount: formData.get('guestCount') || 0,
            dietary: formData.get('dietary') || '',
            message: formData.get('message') || ''
        };

        // Validate email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rsvpData.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Save to localStorage
        try {
            const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
            rsvps.push(rsvpData);
            localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
            // Only update admin stats if in admin mode
            if (isAdmin) {
                updateAdminStats();
            }
            showMessage('RSVP submitted successfully!', 'success');
            rsvpForm.reset();
        } catch (err) {
            showMessage('Error saving RSVP. Please try again.', 'error');
        }
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

    // Admin Panel - Only show if URL has ?admin=true
    const adminToggle = document.getElementById('adminToggle');
    const adminPanel = document.getElementById('adminContent');
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    isAdmin = urlParams.get('admin') === 'true';
    
    // Only show admin button if admin parameter is true
    if (isAdmin) {
        adminToggle.style.display = 'inline-block';
        
        adminToggle.addEventListener('click', () => {
            adminPanel.classList.toggle('show');
            updateAdminStats();
        });
    } else {
        // Hide admin button if not in admin mode
        adminToggle.style.display = 'none';
    }

    function updateAdminStats() {
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        document.getElementById('totalRsvps').textContent = rsvps.length;
        document.getElementById('attendingCount').textContent = rsvps.filter(r => r.attendance === 'yes').length;
        document.getElementById('notAttendingCount').textContent = rsvps.filter(r => r.attendance === 'no').length;
    }

    // Registry Links
    document.querySelectorAll('.registry-link').forEach(link => {
        link.addEventListener('click', () => {
            alert('Registry link opened in new tab');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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

// RSVP Export/Clear
function exportRSVPs() {
    const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
    const csv = [
        ['Name', 'Email', 'Attending', 'Guests', 'Dietary', 'Message'],
        ...rsvps.map(r => [
            r.guestName, r.email, r.attendance, r.guestCount, r.dietary, r.message
        ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-rsvps.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function clearRSVPs() {
    if (confirm('Clear all RSVPs?')) {
        localStorage.removeItem('weddingRSVPs');
        // Check if admin elements exist before updating
        if (document.getElementById('totalRsvps')) {
            updateAdminStats();
        }
    }
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}
