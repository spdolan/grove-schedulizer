const taskMinuteObject = {
  0: { name: 'Repot Sunny the Succulent', duration: 30},
  1: { name: 'Pick up Grove order from mailroom', duration: 15 },
  2: { name: 'Water Sunny the Succulent', duration: 5 },
  3: { name: 'Lunch with Mrs. Meyers', duration: 60 },
  4: { name: 'Farmer\'s Market', duration: 300 },
  5: { name: 'Make coffee', duration: 10 },
  6: { name: 'Stretch and get water', duration: 5 }
}

const addTaskDurationInMinutes = (arrayOfTaskObjects) => {
  return new Promise((resolve, reject) => {
    try {
      const updatedArrayOfTaskObjects = arrayOfTaskObjects.map(taskObject => {
        taskObject.duration = taskMinuteObject[taskObject.id].duration;
        return taskObject;
      });
      resolve(updatedArrayOfTaskObjects);
    } catch (err) {
      reject('Error: ' + err.message);
    }
  })
}

export default addTaskDurationInMinutes;