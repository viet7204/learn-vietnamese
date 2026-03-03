# Learn Vietnamese

A comprehensive, interactive Vietnamese language learning platform with bilingual support (English/Vietnamese).

## Overview

This is a standalone website dedicated to teaching Vietnamese to English speakers. The site features interactive lessons, practice exercises, and visual learning tools - all presented in a bilingual format with English as the default language.

## Features

- **Interactive Lectures**: 5 comprehensive Vietnamese lessons covering:
  - Greetings & Basic Phrases
  - Vietnamese Tones
  - Numbers & Time
  - Daily Conversations
  - Sentence Structure

- **Practice Tools**: Interactive exercises to reinforce learning

- **Visual Learning**: Click-based vocabulary learning with contextual scenes

- **Bilingual Support**: Full English/Vietnamese interface with easy language toggle

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

- **Comments System**: Integrated comment functionality for learner interaction

## Project Structure

```
learn-vietnamese/
├── index.html              # Homepage with overview
├── lectures.html           # Lecture index page
├── practice.html           # Practice exercises page
├── visual.html             # Visual learning tools page
├── lessons/                # Individual lesson pages
│   ├── greetings-basics.html
│   ├── vietnamese-tones.html
│   ├── numbers-time.html
│   ├── daily-conversations.html
│   └── sentence-structure.html
├── css/                    # Stylesheets
│   ├── style.css          # Base styles
│   ├── teaching.css       # Teaching section styles
│   ├── lecture.css        # Lecture page styles
│   ├── practice.css       # Practice page styles
│   ├── visual-learning.css# Visual learning styles
│   └── comments.css       # Comment system styles
├── js/                     # JavaScript files
│   ├── main.js            # Main JavaScript
│   ├── language.js        # Language toggle functionality
│   ├── lectures.js        # Lecture page interactivity
│   ├── practice.js        # Practice exercises
│   ├── visual-learning.js # Visual learning tools
│   └── comments.js        # Comment system
└── data/                   # Data files (if any)
```

## Language Configuration

The site defaults to **English** to target English-speaking learners of Vietnamese. Users can toggle to Vietnamese interface using the language selector in the top-right corner.

### Language Settings

- **Default Language**: English (`lang="en"`)
- **Alternative Language**: Vietnamese
- **Toggle Persistence**: Language preference stored in browser

## Usage

1. Open `index.html` in a web browser
2. Navigate through lectures, practice exercises, or visual learning tools
3. Use the language toggle (EN/VI) to switch interface language
4. Click on lesson cards to access individual lessons
5. Practice exercises are interactive - click to reveal answers
6. Visual learning tools: click objects in scenes to learn vocabulary

## Technical Details

- **Technology Stack**: HTML5, CSS3, Vanilla JavaScript
- **External Dependencies**: Font Awesome 6.0.0 for icons
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Mobile-Friendly**: Responsive design with hamburger menu

## Customization

### Changing Default Language

To change the default language, update:

1. HTML lang attribute in each page: `<html lang="en">` → `<html lang="vi">`
2. Active language button: Move `class="active"` from EN to VI button

### Adding New Lessons

1. Create a new HTML file in the `lessons/` directory
2. Follow the structure of existing lesson files
3. Add a link to the new lesson in `lectures.html`
4. Update navigation and breadcrumb appropriately

## Future Enhancements

- Audio pronunciation guides
- Progress tracking system
- Quiz functionality with scoring
- User accounts and personalized learning paths
- Additional lessons and topics
- Flashcard system
- Mobile app version

## License

Personal educational project.

## Contact

For questions or feedback about the Vietnamese learning content, please use the contact form on the website.

---

**Note**: This is a static website. To deploy, simply upload all files to a web server or use GitHub Pages, Netlify, or similar static hosting services.
