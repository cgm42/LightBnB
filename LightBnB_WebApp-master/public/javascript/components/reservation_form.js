$(() => {


  const $reservationForm = $(`
  <form id="reservation-form" class="reservation-form">
      <p>Reservation</p>
      <div class="reservation-form__field-wrapper">start date
        <input type="date" name="start_date">
      </div>

      <div class="reservation-form__field-wrapper">end date
          <input type="date" name="end_date">
        </div>

      <div class="reservation-form__field-wrapper">
          <input type='submit'></input>
          <a id="reservation-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `);

  window.$reservationForm = $reservationForm;
  
  $reservationForm.on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    data = data + `&id=${MyProperty.id}`
    console.log(data);
    reservation(data)
      .then(json => {
        console.log(json);
        if (!json.user) {
          views_manager.show('error', 'Failed to reservation');
          return;
        }
        console.log(json.user);
        header.update(json.user);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#reservation-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });

      
});