export const getTimeAgo = (date) => {
  
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000; // years
    if (interval > 1) {
      return Math.floor(interval) + ' y ago';
    }
    
    interval = seconds / 2592000; // months
    if (interval > 1) {
      return Math.floor(interval) + ' m ago';
    }
    
    interval = seconds / 604800; // weeks
    if (interval > 1) {
      return Math.floor(interval) + ' w ago';
    }
    
    interval = seconds / 86400; // days
    if (interval > 1) {
      return Math.floor(interval) + ' d ago';
    }
    
    interval = seconds / 3600; // hours
    if (interval > 1) {
      return Math.floor(interval) + ' h ago';
    }
    
    interval = seconds / 60; // minutes
    if (interval > 1) {
      return Math.floor(interval) + ' min ago';
    }
    
    return Math.floor(seconds) + ' sec ago';
  };