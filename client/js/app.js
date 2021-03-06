

class EventManager {

    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento, jsEvento) {
        let eventId = evento.id
        $.post('/events/delete/'+ eventId, {id: eventId}, (response) => {
            alert( response + ' Titulo: ' + evento.title)
            $('.calendario').fullCalendar('removeEvents', evento.id);

        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {

            ev.preventDefault()

            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }
                $.post(url, ev, (response) => {
                    let evn = {
                        id: response,
                        title: title,
                        start: start,
                        end: end
                    }
                    alert("Evento fue creado satisfactoriamente")
                    this.inicializarFormulario()
                    $('.calendario').fullCalendar('renderEvent', evn)
                    document.getElementById("allDay").checked = false
                    $('.timepicker, #end_date').removeAttr("disabled")

                })

            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date, #start_hour, #end_hour' ).val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: new Date(),
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            events: eventos,
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            eventDragStart: (event, jsEvent) => {
                $('#deleteEvent').find('img').attr('src', "./img/delete.png");
                $('#deleteEvent').css('background-color', '#a70f19')
            },
            eventDragStop: (event, jsEvent) =>{
                var trashEl = $('#deleteEvent');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 && jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                      this.eliminarEvento(event, jsEvent);
                }
            }
        })
    }

    actualizarEvento(evento) {

        let id = evento.id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            form_data = new FormData(),
            start_date,
            end_date,
            start_hour,
            end_hour,
            end_day = ''

        if(evento.end != null){
            start_date = start.substr(0,10)
            end_date = end.substr(0,10)
            start_hour = start.substr(11,8)
            end_hour = end.substr(11,8)
            end_day = end_date + 'T' + end_hour
        }else{
            start_date = start.substr(0,10)
            end_date = null
            start_hour = null
            end_hour = null
        }

        let data = {
            id: id,
            start: start_date,
            end: end_day
        }

        $.post('/events/update/', data, (response) => {
            alert(response)
        })
    }

}

const Manager = new EventManager()
