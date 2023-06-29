/* (Note : This function is not a direct API hit , it gets called when this api => "api/group/groupBalanceSheet" gets hit)*/

const simplifySplit = (transactions) => {

    let splits = new Array();//// Initialize an empty array to store splits

    let transaction_map = new Map(Object.entries(transactions));// converting the json object into a map.

    const Rectify_Parllel_Splits = () => {
        let vis = new Map(); // Initialize a new Map to keep track of visited entries

        for (let tr1 of transaction_map.keys()) {
            vis.set(tr1, 1); // Mark tr1 as visited

            for (let tr2 of transaction_map.keys()) {
                if (!vis.has(tr2) && tr1 !== tr2) {
                    // Check if tr2 is not visited and tr1 and tr2 are different

                    if (transaction_map.get(tr2) === -transaction_map.get(tr1)) {
                        // Check if the values of tr1 and tr2 are opposite in sign

                        if (transaction_map.get(tr2) > transaction_map.get(tr1)) {
                            splits.push([tr1, tr2, transaction_map.get(tr2)]);
                        } else {
                            splits.push([tr2, tr1, transaction_map.get(tr1)]);
                        }

                        transaction_map.set(tr2, 0); // Set tr2's value to 0 to indicate it has been settled
                        transaction_map.set(tr1, 0); // Set tr1's value to 0 to indicate it has been settled
                    }
                }
            }
        }
    }

    /* ---------------------------------------------------------------------------------------------------------------*/

    const findExtremeCredits = () => {
        // Initialize variables to store the objects with extreme credits
        let maxOb, minOb;
        // Initialize variables to hold the maximum and minimum values
        let max = Number.MIN_VALUE;
        let min = Number.MIN_VALUE;

        // Iterate over the keys of the transaction_map
        for (let tr of transaction_map.keys()) {
            // Check if the current credit is smaller than the minimum
            if (transaction_map.get(tr) < min) {
                // Update the minimum value
                min = transaction_map.get(tr);
                // Store the corresponding object as the object with the minimum credit
                minOb = tr;
            }

            // Check if the current credit is greater than the maximum
            if (transaction_map.get(tr) > max) {
                // Update the maximum value
                max = transaction_map.get(tr);
                // Store the corresponding object as the object with the maximum credit
                maxOb = tr;
            }
        }

        // Return an array containing the object with the minimum credit and the object with the maximum credit
        return [minOb, maxOb];
    }

    /* -----------------------------------------------------------------------------------------------------------------------*/

    const recursiveSplitCalculation = () => {
        // Find the users with maximum and minimum credits
        let minmax = findExtremeCredits();

        // Check if both users with maximum and minimum credits exist
        if (minmax[0] == undefined || minmax == undefined) return;

        // Determine the minimum value between the negative credit of the minimum user and the credit of the maximum user
        let minVal = Math.min(-transaction_map.get[minmax[0]], transaction_map.get[minmax[1]]);

        // Adjust the credits by adding minVal to the minimum user and subtracting minVal from the maximum user
        transaction_map.set(minmax[0], transaction_map.get(minmax[0]) + minVal);
        transaction_map.set(minmax[1], transaction_map.get(minmax[1]) - minVal);

        // Round minVal to two decimal places
        minVal = Math.round((minVal + Number.EPSILON) * 100) / 100;

        // Create an array containing the minimum user, maximum user, and the settled amount
        let res = [minmax[0], minmax[1], minVal];

        // Add the settlement to the splits array
        splits.push(res);

        // Recursively call the function to continue the split calculation
        recursiveSplitCalculation();
    }


    Rectify_Parllel_Splits();
    recursiveSplitCalculation();
    return splits;

}



module.exports = simplifySplit;