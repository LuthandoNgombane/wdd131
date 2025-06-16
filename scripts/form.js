document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('product-name')) {
    //LN - Load products for form.html
    fetch('scripts/form.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(products => {
        const productSelect = document.getElementById('product-name');
        products.forEach(product => {
          const option = document.createElement('option');
          option.value = product.id;
          option.textContent = product.name;
          productSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error loading products:', error);
        //LN - Fallback: Populate with a default option
        const productSelect = document.getElementById('product-name');
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Error loading products';
        productSelect.appendChild(option);
      });
  }

  if (document.getElementById('form-data')) {
    //LN - Display form data and update counter for review.html
    const params = new URLSearchParams(window.location.search);
    const fields = [
      { key: 'product-name', label: 'Product Name' },
      { key: 'rating', label: 'Overall Rating' },
      { key: 'install-date', label: 'Date of Installation' },
      { key: 'features', label: 'Useful Features' },
      { key: 'review-text', label: 'Written Review' },
      { key: 'user-name', label: 'Your Name' }
    ];

    const dl = document.getElementById('form-data');
    fields.forEach(field => {
      const value = params.get(field.key);
      if (value) {
        const dt = document.createElement('dt');
        dt.textContent = field.label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        dl.append(dt, dd);
      }
    });

    //LN - Update review counter
    let reviewCount = localStorage.getItem('reviewCount') || 0;
    reviewCount = parseInt(reviewCount) + 1;
    localStorage.setItem('reviewCount', reviewCount);
    document.querySelector('#review-counter span').textContent = reviewCount;
  }
});