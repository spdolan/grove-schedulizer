const notify = () => {

  return new Promise((resolve, reject) => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications");
      resolve(false);
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      const notification = new Notification("Hi there! You will now receive notifications for your schedule.");
      resolve(true);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there! You will now receive notifications for your schedule.");
          resolve(true)
        } else {
          resolve(false);
        }
      });
    }

  })
}

export default notify;