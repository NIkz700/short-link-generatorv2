function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value.trim();
  const output = document.getElementById("output");

  if (!longUrl) {
    output.innerHTML = `<span style="color:red;">⚠️ Please enter a URL.</span>`;
    return;
  }

  const encodedUrl = encodeURIComponent(longUrl);
  const apiUrl = `https://tinyurl.com/api-create.php?url=${encodedUrl}`;

  fetch(apiUrl)
    .then((response) => response.text())
    .then((shortUrl) => {
      output.innerHTML = `
        <p>✅ <strong>Shortened URL:</strong><br>
        <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
        <button onclick="copyToClipboard('${shortUrl}')">📋 Copy</button>
      `;
    })
    .catch((error) => {
      output.innerHTML = `<span style="color:red;">❌ Error: ${error.message}</span>`;
    });
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Short URL copied to clipboard!");
  });
}
