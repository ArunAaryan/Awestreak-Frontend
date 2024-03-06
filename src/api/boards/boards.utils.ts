export const checkIfLessThanOrEqualToYesterday = (date: Date) => {

    const updated_at = new Date(date); 

    // Get the current date
    const today = new Date();
    
    // Subtract one day from today
    const oneDayBeforeToday = new Date(today);
    oneDayBeforeToday.setDate(today.getDate() - 1);
    
    // Compare the two dates
    if (updated_at < oneDayBeforeToday) {
        return true
    } 
    return false
}