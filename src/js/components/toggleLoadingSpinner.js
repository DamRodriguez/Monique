export function toggleLoadingSpinner(visible) {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = visible ? 'flex' : 'none';
}
