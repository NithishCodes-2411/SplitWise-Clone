/* (Note : This function is not a direct API hit , it gets called when this api => "api/group/groupBalanceSheet" gets hit) */

function simplifySplit(transactions) {
    var splits = new Array(); // Initialize an empty array to store the settled transactions
    var transaction_map = new Map(Object.entries(transactions)); // Convert JSON to a Map object for easy manipulation of transactions

    // Function to find and settle transactions with opposite amounts
    function settleSimilarFigures() {
        let vis = new Map(); // Create a map to keep track of visited transactions
        for (let tr1 of transaction_map.keys()) { // Iterate through each transaction (tr1) in the map
            vis.set(tr1, 1); // Mark tr1 as visited
            for (let tr2 of transaction_map.keys()) { // Iterate through each transaction (tr2) again
                if (!vis.has(tr2) && tr1 != tr2) { // If tr2 is not visited and it's different from tr1
                    if (transaction_map.get(tr2) == -transaction_map.get(tr1)) { // If tr2's amount is the negation of tr1's amount
                        if (transaction_map.get(tr2) > transaction_map.get(tr1)) {
                            // If tr2's amount is greater than tr1's amount, add a settlement to splits array
                            splits.push([tr1, tr2, transaction_map.get(tr2)]);
                        } else {
                            // If tr1's amount is greater than tr2's amount, add a settlement to splits array
                            splits.push([tr2, tr1, transaction_map.get(tr1)]);
                        }
                        transaction_map.set(tr2, 0); // Set tr2's amount to zero as it's settled
                        transaction_map.set(tr1, 0); // Set tr1's amount to zero as it's settled
                    }
                }
            }
        }
    }

    // Function to get transactions with maximum and minimum amounts
    function getMaxMinCredit() {
        let max_ob, min_ob, max = Number.MIN_VALUE, min = Number.MAX_VALUE;
        for (let tr of transaction_map.keys()) {
            if (transaction_map.get(tr) < min) { // If the transaction's amount is less than the current minimum
                min = transaction_map.get(tr); // Update the minimum amount
                min_ob = tr; // Store the transaction with the minimum amount
            }
            if (transaction_map.get(tr) > max) { // If the transaction's amount is greater than the current maximum
                max = transaction_map.get(tr); // Update the maximum amount
                max_ob = tr; // Store the transaction with the maximum amount
            }
        }
        return [min_ob, max_ob]; // Return an array containing the transactions with maximum and minimum amounts
    }

    // Recursive helper function to repeatedly settle transactions with maximum and minimum amounts
    function helper() {
        let minMax = getMaxMinCredit(); // Get transactions with maximum and minimum amounts
        if (minMax[0] == undefined || minMax[1] == undefined) return; // If there are no transactions left to settle, return
        let min_value = Math.min(-transaction_map.get(minMax[0]), transaction_map.get(minMax[1]));
        // Calculate the minimum settlement amount by finding the minimum of the negation of minMax[0]'s amount and minMax[1]'s amount
        transaction_map.set(minMax[0], transaction_map.get(minMax[0]) + min_value);
        // Update minMax[0]'s amount by adding the minimum settlement amount
        transaction_map.set(minMax[1], transaction_map.get(minMax[1]) - min_value);
        // Update minMax[1]'s amount by subtracting the minimum settlement amount
        min_value = Math.round((min_value + Number.EPSILON) * 100) / 100; // Round min_value to two decimal places
        let res = [minMax[0], minMax[1], min_value]; // Create a settlement array containing the transactions and the settled amount
        splits.push(res); // Add the settlement array to the splits array
        helper(); // Recursively call the helper function to continue settling transactions
    }

    settleSimilarFigures(); // Call the function to settle transactions with opposite amounts
    helper(); // Call the recursive helper function to repeatedly settle transactions

    return splits; // Return the final array of settled transactions
}

module.exports = simplifySplit;