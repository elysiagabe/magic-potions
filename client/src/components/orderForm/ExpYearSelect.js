import React from 'react';

const ExpYearSelect = () => {
    const currentYear = new Date().getFullYear()

    const getYears = () => {
        const yearsArr = []
        let year = currentYear

        while (year <= currentYear + 30) {
            yearsArr.push(year)
            year++
        }

        return yearsArr
    }


    return (
        <>
        {/* Creates expiration year select option for years up to 30 years from today's date */}
        {getYears().map(y => (
            <option key={y} value={y.toString().slice(2)}>{y.toString().slice(2)}</option>
        ))}
        </>
    )
}

export default ExpYearSelect;