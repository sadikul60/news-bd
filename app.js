// loadCategory start
const loadCategory = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
};
// loadCategory end



// toggleSpinner
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spinner-loader');
  if (isLoading){
      loaderSection.classList.remove('d-none')
  }
  else {
      loaderSection.classList.add('d-none')
  }
}



// displayCategory start
const displayCategory = categories =>{

  const categoryContainer = document.getElementById('category-container');
  categoryContainer.textContent = '';
    categories.forEach(category =>{
        // console.log(category);

        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <div> <a onclick="loadData('${category.category_id}')" class="nav-link" aria-current="page" href="#"><span class="h4 text-info">${category.category_name}</span></a>
        </div>
        `;
        categoryContainer.appendChild(categoryDiv);
    });
};
// displayCategory end




// loadData start
const loadData = async (id) =>{
  // start toggleSpinner
  toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
};
// loadData end



// displayData start 
const displayData = categories =>{
  // console.log(categories)
  const categoriesLength = (categories.length);

  const categoriesNumber = document.getElementById('category-number');
  categoriesNumber.innerText = categoriesLength;
  const categoryText = document.getElementById('category-text');
  
  if (categories.length === 0){
    categoriesNumber.innerText = 'No Category Numbers found'
    categoryText.classList.add('d-none');
  }
  else {
    categoryText.classList.remove('d-none')
  }
  const noData = document.getElementById('no-data-found');
  if(categories.length === 0){
    noData.classList.remove('d-none');
    // stop toggleSpinner
    toggleSpinner(false);
  }
  else{
    noData.classList.add('d-none');
    toggleSpinner(true);
  }


  const categoriesContainer = document.getElementById('categories-container');
  categoriesContainer.textContent = '';
    // console.log(categories);
        categories.forEach(category => {
            
          
          const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('card');

        // start toggleSpinner
        toggleSpinner(true);

        categoryDiv.innerHTML = `
        <div class="row shadow-lg p-3 mb-5 bg-body rounded border-0">
              <div class="col-12 col-sm-12 col-md-6 col-lg-4">
                <img src="${category.thumbnail_url}" class="img-fluid w-100 rounded-start" alt="...">
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-8">
                <div class="card-body">
                  <h3 class="card-title">${category.title ? category.title : 'No data Found'}</h3>
                  <p class="card-text h5 mb-5">${category.details.slice(0, 400)}.....</p>
                  <div class="d-block d-sm-block d-md-flex d-lg-flex pt-5 align-items-center sm-text-center justify-content-between">
                    <div class="d-block d-sm-block d-md-flex d-lg-flex sm-mt-5  align-items-center justify-content-center text-center text-sm-center text-md-left text-lg-left">
                      <img src="${category.author.img ? category.author.img : 'No data Found'}" class=" author-image rounded-circle" alt="...">
                      <p class="card-text h4 ms-2"><strong><span>${category.author.name ? category.author.name : 'No data Fuound'}</span></br> ${category.author.published_date ? category.author.published_date : 'No data Fuound'}</strong></p>
                    </div>

                      <div class="d-flex xl-ps-5">
                        <p class="card-text h4 text-center text-sm-center text-md-center text-lg-center"><strong><span class="me-2"> <i class="fa-solid fa-eye"></i></span>${category.rating.number ? category.rating.number : 'No data Fuound'}M</strong></p>
                      </div>
                      <div>
                        <div class="card-text h4 text-right p-0 me-5"> 
                          <a onclick="loadCategoryDetails('${category._id}')" class="nav-link"  data-bs-toggle="modal" data-bs-target="#categoryDetailsModal" aria-current="page" href="#"><strong><span>MORE</span> <i class="fa-solid fa-arrow-right"></i></strong></a>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        `;
        categoriesContainer.appendChild(categoryDiv);
        // stop toggleSpinner
        toggleSpinner(false);
        });
  };
// displayData end 




// loadCategoryDetails start
const loadCategoryDetails = async (news_id) =>{
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategoryDetails(data.data[0]);
};
// loadCategoryDetails end

// displayCategoryDetails start
const displayCategoryDetails = category =>{
  // console.log(category);
  
    const categoryTitle = document.getElementById('categoryDetailsModalLabel');
  categoryTitle.innerText = category.title;

  const categoryDetails = document.getElementById('category-details');
  categoryDetails.innerHTML = `
    <div class="text-center">
      <img src="${category.image_url ? category.image_url : 'No Data Found'}" class="img-fluid" alt="...">
    </div>
    <div class="mt-5">
      <h3> Author:</h3>
      <div class="ms-5">
      <h4>Name: ${category.author.name ? category.author.name : 'No Name Found'}</h4>
      <h5>Published Date: ${category.author.published_date ? category.author.published_date : 'No Data Found'}</h5>
      </div>
    </div>

    <div class="mt-5">
      <h3>Others Info :</h3>
      <div class="ms-5">
      <h5>Is Todays Pick: ${category.others_info.is_todays_pick ? category.others_info.is_todays_pick : 'No Data Found'}</h5>
      <h5>Is Trending: ${category.others_info.is_trending ? category.others_info.is_trending : 'No Data Found'}</h5>
      </div>
    </div>

    <div class="mt-5">
      <h3>Rating :</h3>
      <div class="ms-5">
      <h5>Badge: ${category.rating.badge ? category.rating.badge : 'No Data Found'}</h5>
      <h5>Number: ${category.rating.number ? category.rating.number : 'No Data Found'}</h5>
      </div>
        <h3 class="my-5">Total View: ${category.total_view ? category.total_view : 'No Data Found'}</h3>
      <div class="text-left">
      <h3>Dtails:</h3>
      <h5 class="mx-5">Details: ${category.details ? category.details : 'No Data Found'}</h5>
      </div>
    </div>
  `;
  toggleSpinner(false);
};



// displayCategoryDetails end

loadCategory('01');




 