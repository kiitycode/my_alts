document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const postsContainer = document.getElementById('postsContainer');
            const newPostBtn = document.getElementById('newPostBtn');
            const editProfileBtn = document.getElementById('editProfileBtn');
            const newPostForm = document.getElementById('newPostForm');
            const profileForm = document.getElementById('profileForm');
            const previewImage = document.getElementById('previewImage');
            const previewTitle = document.getElementById('previewTitle');
            
            // Sample posts data
            let posts = [
                {
                    image: "./CIRCLE 17 PICTURES/PICTURES/Val thorens.png",
                    title: "Val Thorens",
                    liked: false
                },
                {
                    image: "./CIRCLE 17 PICTURES/PICTURES/Restaurant terrace.png",
                    title: "Restaurant Terrace",
                    liked: false
                },
                {
                    image: "./CIRCLE 17 PICTURES/PICTURES/An outdoor cafe.png",
                    title: "An outdoor cafe",
                    liked: false
                },
                {
                    image: "./CIRCLE 17 PICTURES/PICTURES/A very long bridge.png",
                    title: "A very long bridge",
                    liked: false
                },
                {
                    image: "./CIRCLE 17 PICTURES/PICTURES/Tunnel with morning light.png",
                    title: "Tunnel with morning light",
                    liked: false
                },
                {
                    image: "./CIRCLE 17 PICTURES/PICTURES/Mountain house.png",
                    title: "Mountain house",
                    liked: false
                }
            ];

            // Render all posts
            function renderPosts() {
                postsContainer.innerHTML = '';
                posts.forEach((post, index) => {
                    const postCard = document.createElement('div');
                    postCard.className = 'post-card';
                    postCard.innerHTML = `
                        <div class="post-card-img">
                            <img src="${post.image}" alt="${post.title}" class="post-img" data-index="${index}">
                        </div>
                        <div class="title-container">
                            <p class="post-name">${post.title}</p>
                            <button class="like-btn" data-index="${index}">
                                <i class="${post.liked ? 'fas fa-heart liked' : 'far fa-heart'}"></i>
                            </button>
                        </div>
                    `;
                    postsContainer.appendChild(postCard);
                });
            }

            // Modal functions
            function openModal(modalId) {
                document.getElementById(modalId).style.display = 'block';
            }

            function closeModal(modalId) {
                document.getElementById(modalId).style.display = 'none';
            }

            // Event listeners
            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });

            window.addEventListener('click', function(e) {
                if (e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });

            // Like functionality
            postsContainer.addEventListener('click', function(e) {
                const likeBtn = e.target.closest('.like-btn');
                if (likeBtn) {
                    const index = likeBtn.dataset.index;
                    posts[index].liked = !posts[index].liked;
                    renderPosts();
                }
                
                // Image preview
                const postImg = e.target.closest('.post-img');
                if (postImg) {
                    const index = postImg.dataset.index;
                    previewImage.src = posts[index].image;
                    previewTitle.textContent = posts[index].title;
                    openModal('previewModal');
                }
            });

            // New post functionality
            newPostBtn.addEventListener('click', function() {
                openModal('newPostModal');
            });

            newPostForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const title = document.getElementById('postTitle').value;
                const imageFile = document.getElementById('postImage').files[0];
                
                if (imageFile) {
                    const newPost = {
                        image: URL.createObjectURL(imageFile),
                        title: title,
                        liked: false
                    };
                    posts.unshift(newPost); // Add to beginning
                    renderPosts();
                    closeModal('newPostModal');
                    this.reset();
                }
            });

            // Edit profile functionality
            editProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('editProfileModal');
            });

            profileForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const title = document.getElementById('title').value;
                const imageFile = document.getElementById('profileImage').files[0];
                
                // Update profile info
                if (name) document.querySelector('.profile-name h2').textContent = name;
                if (title) document.querySelector('.profile-name p').textContent = title;
                if (imageFile) {
                    document.querySelector('.profile-img img').src = URL.createObjectURL(imageFile);
                }
                
                closeModal('editProfileModal');
            });

            // Initial render
            renderPosts();
        });