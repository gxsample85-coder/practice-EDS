// export default function decorate(block) {
//   const rows = [...block.children];

//   rows.forEach((row, rowIndex) => {
//     const cols = [...row.children];

//     // First Row: Previous Button
//     if (rowIndex === 0) {
//       const prevButton = document.createElement('button');
//       prevButton.classList.add('slide-prev');
//       prevButton.setAttribute('aria-label', 'Previous slide');
//       prevButton.innerHTML = row.innerText.trim() || '‹';
//       row.replaceWith(prevButton);
//     } 
//     // Last Row: Next Button
//     else if (rowIndex === rows.length - 1) {
//       const nextButton = document.createElement('button');
//       nextButton.classList.add('slide-next');
//       nextButton.setAttribute('aria-label', 'Next slide');
//       nextButton.innerHTML = row.innerText.trim() || '›';
//       row.replaceWith(nextButton);
//     } 
//     // Middle Rows: Slides
//     else {
//       row.classList.add('slide');

//       // First Column: Image Container
//       if (cols[0]) {
//         cols[0].classList.add('slide-image');
//       }

//       // Second Column: Text/Caption Overlay
//       if (cols[1]) {
//         cols[1].classList.add('slide-text');
//       }
//     }
//   });

//   // Client-side Slider Navigation Logic
//   const slides = block.querySelectorAll('.slide');
//   const prevBtn = block.querySelector('.slide-prev');
//   const nextBtn = block.querySelector('.slide-next');

//   let currentSlide = 0;

//   function showSlide(index) {
//     if (index >= slides.length) currentSlide = 0;
//     else if (index < 0) currentSlide = slides.length - 1;
//     else currentSlide = index;

//     slides.forEach((slide, i) => {
//       slide.style.display = i === currentSlide ? 'block' : 'none';
//     });
//   }

//   if (prevBtn) {
//     prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
//   }

//   if (nextBtn) {
//     nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
//   }

//   // Initial load par pehli slide display karna
//   if (slides.length > 0) {
//     showSlide(0);
//   }
// }


import { fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  // 1. Current URL se language prefix detect karein (/de ya /en)
  const langPrefix = window.location.pathname.startsWith('/de') ? '/de' : '/en';

  // 2. Sahi language ke placeholders fetch karein
  const placeholders = await fetchPlaceholders(langPrefix);
  const prevLabel = placeholders.previousSlide || placeholders['previous-slide'] || 'Previous';
  const nextLabel = placeholders.nextSlide || placeholders['next-slide'] || 'Next';

  const rows = [...block.children];
  const prevText = rows[0]?.innerText.trim() || '‹';
  const nextText = rows[rows.length - 1]?.innerText.trim() || '›';
  const slideRows = rows.slice(1, -1);

  // Saari slides ka HTML ek sath map karke generate karein
  const slidesHtml = slideRows.map((row) => {
    const [imgCell, textCell] = row.children;
    return `
      <div class="slide slidetest">
        <div class="slide-image">${imgCell ? imgCell.innerHTML : ''}</div>
        <div class="slide-text">${textCell ? textCell.innerHTML : ''}</div>
      </div>
    `;
  }).join('');

  // 3. Buttons mein dynamic placeholders (prevLabel & nextLabel) bind karein
  block.innerHTML = `
    <button class="slide-prev" aria-label="${prevLabel}">${prevText}</button>
    <div class="slides-wrapper">${slidesHtml}</div>
    <button class="slide-next" aria-label="${nextLabel}">${nextText}</button>
  `;

  // Slider navigation logic
  const slides = block.querySelectorAll('.slide');
  let currentIndex = 0;

  const showSlide = (idx) => {
    currentIndex = (idx + slides.length) % slides.length;
    slides.forEach((s, i) => s.style.display = i === currentIndex ? 'block' : 'none');
  };

  block.querySelector('.slide-prev').onclick = () => showSlide(currentIndex - 1);
  block.querySelector('.slide-next').onclick = () => showSlide(currentIndex + 1);

  showSlide(0);
}