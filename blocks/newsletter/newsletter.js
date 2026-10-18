import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

export default async function decorate(block) {
  // 1. Current page ki language determine karein (e.g. 'en', 'de', 'fr')
  const locale = getMetadata('locale') || window.location.pathname.split('/')[1] || 'en';

  // 2. Us specific language ke placeholders load karein
  const placeholders = await fetchPlaceholders(`/${locale}`);

  // 3. Keys ko UI mein render karein
  const submitText = placeholders.submitButton || 'Submit';
  const inputHint = placeholders.searchPlaceholder || 'Type something...';

  block.innerHTML = `
    <form class="newsletter-form">
      <input type="email" placeholder="${inputHint}" required />
      <button type="submit">${submitText}</button>
    </form>
  `;
}