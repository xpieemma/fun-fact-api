

const API_BASE = ''; 

    const factEndpoint = `${API_BASE}/api/fun-fact`;

    const factDisplay = document.getElementById('factDisplay');
    const errorDiv = document.getElementById('errorMessage');
    const factTimeSpan = document.getElementById('factTime');
    const newFactBtn = document.getElementById('newFactBtn');
    const shareBtn = document.getElementById('shareBtn');

    // format timestamp nicely
    function formatTime(isoString) {
      if (!isoString) return '';
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    // how error (and hide after a few seconds)
    function showError(message) {
      errorDiv.textContent = message;
      errorDiv.classList.add('show');
      setTimeout(() => {
        errorDiv.classList.remove('show');
      }, 5000);
    }

    
    async function fetchFact() {
      // set loading state
      factDisplay.textContent = '🔍 fetching your fact...';
      factDisplay.classList.add('loading');
      factTimeSpan.textContent = '';

      try {
        const response = await fetch(factEndpoint);

        if (!response.ok) {
          let details = '';
          try {
            const errorData = await response.json();
            details = errorData.error || errorData.details || response.statusText;
          } catch {
            details = response.statusText;
          }
          throw new Error(`Failed to load: ${response.status} ${details}`);
        }

        const data = await response.json();
        // expected: { fact: "...", timestamp: "..." }

        if (!data.fact) {
          throw new Error('Invalid response format');
        }

        factDisplay.textContent = data.fact;
        factDisplay.classList.remove('loading');

        if (data.timestamp) {
          factTimeSpan.textContent = `🕒 ${formatTime(data.timestamp)}`;
        } else {
          factTimeSpan.textContent = '';
        }

      } catch (error) {
        console.error('Fetch error:', error);
        factDisplay.textContent = '⚠️ something went wrong';
        factDisplay.classList.remove('loading');
        showError(error.message || 'Could not fetch fact. Please try again.');
      }
    }

    // Fetch a fact on page load
    fetchFact();

 
    newFactBtn.addEventListener('click', fetchFact);

    shareBtn.addEventListener('click', async () => {
      const fact = factDisplay.textContent;
   
      if (!fact || factDisplay.classList.contains('loading') || fact.startsWith('⚠️') || fact.startsWith('🔍')) {
        showError('No fact to share yet!');
        return;
      }

      try {
        await navigator.clipboard.writeText(fact);
        // temporary visual feedback
        shareBtn.textContent = '✓ copied!';
        setTimeout(() => {
          shareBtn.textContent = '📋 Copy';
        }, 1500);
      } catch (err) {
        showError('Could not copy to clipboard');
      }
    });