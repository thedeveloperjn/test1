import videojs from 'video.js'

// Vimeo Tech (loading from CDN for simplicity)
const script = document.createElement('script')
script.src = 'https://player.vimeo.com/api/player.js'
document.head.appendChild(script)

script.onload = () => {
    const vimeoTech = require('@vimeo/player')
    videojs.registerTech('vimeo', vimeoTech)
}

