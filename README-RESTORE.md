# Website Restore Instructions

## Current Status
- `index.html` = Simple "Hey there!" welcome page (currently live)
- `index-full.html` = Complete wedding website (backed up)

## To Restore Full Wedding Website

### Option 1: Replace the file
```bash
cp index-full.html index.html
```

### Option 2: Rename files
```bash
# Save current simple version (optional)
mv index.html index-simple.html

# Restore full website
mv index-full.html index.html
```

## To Go Back to Simple Welcome Page

### If you saved the simple version:
```bash
cp index-simple.html index.html
```

### If you need to recreate it:
The simple welcome page just shows "Hey there!" with the message "Thanks for visiting. More details coming soon!"

## Files That Were Not Changed
- `styles.css` - All original styles preserved
- `script.js` - All original JavaScript preserved
- `firebase-config.js` - Firebase configuration preserved
- All other files remain unchanged

Your complete wedding website code is 100% preserved and ready to be restored at any time!
