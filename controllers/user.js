

// Create endpoint /api/beers for GET
exports.getAuthorize = function(req, res) {


    res.redirect('https://pitangui.amazon.com/spa/skill/account-linking-status.html?vendorId=M1HU09WA2LOQ9P&state=' + req.query.state + '&token_type=Bearer&access_token=12345098765');

    // res.json({
    //     state: req.query.state,
    //     access_token: {
    //         value: "iP1qtgEULTriDucjLzPS73YPrPagMfyUqTCki540AgfUBpoXAYu19ZaF7I3q3uKXnfNyZdF75bJJsgpvVUE2e9fSIofhoCpyTxMawZGEB2IAAkzEOuBR1150P7JAxqUvpEwDh6bok7xQy8KSYCbbjBNULFQKTeFc9P5kU1g0E6uOJXKfObpkP8ZTbZtdccJbvMU43vTsjP6",
    //         userId: "58b4c6606ef1e82c300cfe4f"
    //     },
    //     token_type: "Bearer"
    // });
};

// Create endpoint /api/beers/:beer_id for GET
// exports.getBeer = function(req, res) {
//   // Use the Beer model to find a specific beer
//   Beer.findById(req.params.beer_id, function(err, beer) {
//     if (err)
//       return res.send(err);

//     res.json(beer);
//   });
// };