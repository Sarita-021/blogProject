document.addEventListener("DOMContentLoaded", function () {
    console.log("deleteConfirm.js loaded"); 

    // Wait until the entire page is fully loaded
    setTimeout(() => {
        const deleteForm = document.getElementById("deleteForm");

        if (deleteForm) {
            console.log("Delete form found"); 

            deleteForm.addEventListener("submit", function (event) {
                console.log("Delete button clicked"); 
                if (!confirm("Are you sure you want to delete this post?")) {
                    console.log("Deletion canceled"); 
                    event.preventDefault(); 
                } else {
                    console.log("Post deleted"); 
                }
            });
        } else {
            console.log("Delete form NOT found - checking again in 1s"); 
            setTimeout(() => {
                const retryDeleteForm = document.getElementById("deleteForm");
                if (retryDeleteForm) {
                    console.log("Delete form found on retry");
                    retryDeleteForm.addEventListener("submit", function (event) {
                        if (!confirm("Are you sure you want to delete this post?")) {
                            event.preventDefault();
                        }
                    });
                } else {
                    console.error("Delete form still NOT found after retry.");
                }
            }, 1000);
        }
    }, 500); 
});
