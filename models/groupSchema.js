const mongoose = require('mongoose');

const Group = new mongoose.Schema({

    groupName: {
        type: String,
        required: true
    },
    groupDescription: {
        type: String
    },
    groupCurrency: {
        type: String,
        default: "CAD"
    },
    groupOwner: {
        type: String,
        required: true
    },
    groupMembers: {
        type: Array,
        required: true
    },
    groupCategory: {
        type: String,
        default: "Others"
    },
    groupTotal: {
        type: Number,
        default: 0
    },
    split: {
        type: Array
    }

})

const groupModel = new mongoose.model("Group", Group);
module.exports = groupModel;