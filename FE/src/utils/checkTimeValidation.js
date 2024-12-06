export const parseTimeString = (timeStr) => {
    let today = new Date().toISOString().split('T')[0];

    let time = timeStr?.split(' ')[0];
    let modifier = timeStr?.split(' ')[1];
    let hours = Number(time?.split(':')[0]);
    let minutes = Number(time?.split(':')[1]);

    if (modifier === 'pm' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'am' && hours === 12) {
        hours = 0;
    }

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return new Date(`${today}T${hours}:${minutes}:00`);
}

export const timesOverlap = (start1, end1, start2, end2) => {
    let startTime1 = parseTimeString(start1);
    let endTime1 = parseTimeString(end1);
    let startTime2 = parseTimeString(start2);
    let endTime2 = parseTimeString(end2);

    return startTime1 < endTime2 && startTime2 < endTime1;
}

export const isValidTimeSlot = (newStart, newEnd, timeSlot) => {
    for (let slot of timeSlot) {
        let { startTime: existingStart, endTime: existingEnd, ...rest } = slot;
        if (timesOverlap(newStart, newEnd, existingStart, existingEnd)) {
            return false;
        }
    }
    return true;
}

export const checkOverlappingTimeSlots = (timeSlots) => {
    if (timeSlots?.length < 2) return false;
    for (let i = 0; i < timeSlots.length; i++) {
        for (let j = i + 1; j < timeSlots.length; j++) {
            let { startTime: start1, endTime: end1 } = timeSlots[i];
            let { startTime: start2, endTime: end2 } = timeSlots[j];
            if (timesOverlap(start1, end1, start2, end2)) {
                return true;
            }
        }
    }
    return false;
}