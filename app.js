$(document).ready(function() {
  // Array para almacenar los cumpleaños
  var birthdays = [];

  // Función para agregar un cumpleaños al array y actualizar la lista
  function addBirthday(name, date, relationship, image) {
    var birthday = {
      name: name,
      date: date,
      relationship: relationship,
      image: image
    };

    birthdays.push(birthday);
    updateBirthdayList();
  }

  // Función para actualizar la lista de cumpleaños
  function updateBirthdayList() {
    // Limpiar la lista existente
    $('#birthday-items').empty();

    // Ordenar los cumpleaños por fecha
    birthdays.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    // Recorrer los cumpleaños y agregar elementos a la lista
    for (var i = 0; i < birthdays.length; i++) {
      var birthday = birthdays[i];
      var listItem = $('<li>').addClass('list-group-item');
      var age = calculateAge(birthday.date);

      listItem.append('<h3>' + birthday.name + '</h3>');
      listItem.append('<p><strong>Fecha de Cumpleaños:</strong> ' + birthday.date + '</p>');
      listItem.append('<p><strong>Edad:</strong> ' + age + '</p>');
      listItem.append('<p><strong>Relación:</strong> ' + birthday.relationship + '</p>');

      // Agregar la imagen si está disponible
      if (birthday.image) {
        var imageElement = $('<img>').attr('src', birthday.image).addClass('birthday-image').attr('alt', birthday.name);
        listItem.append(imageElement);
      }

      $('#birthday-items').append(listItem);
    }
  }

  // Función para calcular la edad a partir de una fecha de cumpleaños
  function calculateAge(birthdate) {
    var today = new Date();
    var birthdateObj = new Date(birthdate);
    var age = today.getFullYear() - birthdateObj.getFullYear();
    var monthDiff = today.getMonth() - birthdateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
      age--;
    }
    return age;
  }

  // Manejador de eventos para el envío del formulario de agregar cumpleaños
  $('form').submit(function(event) {
    event.preventDefault();
    var name = $('#name').val();
    var date = $('#date').val();
    var relationship = $('#relationship').val();
    var image = ''; // Variable para almacenar la ruta de la imagen

    // Obtener la imagen seleccionada
    var fileInput = $('#image')[0];
    if (fileInput.files.length > 0) {
      var file = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        image = e.target.result;
        addBirthday(name, date, relationship, image);
        $('form').trigger('reset');
      };
      reader.readAsDataURL(file);
    } else {
      addBirthday(name, date, relationship, image);
      $('form').trigger('reset');
    }
  });

  // Manejador de eventos para el botón de limpiar cumpleaños
  $('#clear-birthdays').click(function() {
    birthdays = [];
    updateBirthdayList();
  });
});
