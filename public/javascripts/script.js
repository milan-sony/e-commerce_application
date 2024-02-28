function addToCart(productID) {
    $.ajax({
        url: '/add_to_cart/' + productID, // redirect
        method: 'get',
        success: (response) => {
            alert(response)
        }
    })
}