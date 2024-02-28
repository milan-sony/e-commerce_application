function addToCart(productID) {
    $.ajax({
        url: '/add_to_cart/' + productID, // redirect
        method: 'get',
        success: (response) => {
            if (response.status){
                let count = $('#cart-count').html()
                count = parseInt(count) + 1
                $('#cart-count').html(count)
            }
            // alert(response)
        }
    })
}