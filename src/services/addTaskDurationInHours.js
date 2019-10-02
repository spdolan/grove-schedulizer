const taskHourObject = {
  0: { name: 'Repot Sunny the Succulent', duration: 1},
  1: { name: 'Pick up Grove order from mailroom', duration: '025' },
  2: { name: 'Water Sunny the Succulent', duration: '025' },
  3: { name: 'Lunch with Mrs. Meyers', duration: 1 },
  4: { name: 'Farmer\'s Market', duration: 1 },
  5: { name: 'Make coffee', duration: '025' },
  6: { name: 'Stretch and get water', duration: '025' }
}

const addTaskDurationInHours = (arrayOfTaskObjects) => {
  return new Promise((resolve, reject) => {
    try {
      const updatedArrayOfTaskObjects = arrayOfTaskObjects.map(taskObject => {
        taskObject.duration = taskHourObject[taskObject.id].duration;
        return taskObject;
      });
      resolve(updatedArrayOfTaskObjects);
    } catch (err) {
      reject('Error: ' + err.message);
    }
  })
}

export default addTaskDurationInHours;