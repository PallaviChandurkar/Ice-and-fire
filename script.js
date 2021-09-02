//creating heading 3 tag with text
var h3 = document.createElement('h3');
h3.innerHTML = "Ice and Fire API";
h3.style.textAlign = "center";
h3.style.marginTop = "20px";

//creating heading h2 tag for loading text
var h2 = document.createElement('h2');
h2.innerHTML = "loading....";
h2.style.textAlign = "center";
h2.style.margin = "100px";

document.body.append(h3, h2);

//assigning api to a variable
var url = "https://www.anapioficeandfire.com/api/characters?page=1&pageSize=25";

//async function to fetch and display the data
async function foo() {
    try {
        let data = await fetch(url);
        let data1 = await data.json();

        //settimeout function for loading table  
        function myFunction() {
            setTimeout(() => {
                h2.style.display = "none";
                table.style.display = "block";
            }, 14000);
        }
        myFunction();

        //creation of table using dom
        var container = document.createElement('div');
        container.setAttribute('class', 'container');

        var table = document.createElement('table');
        table.setAttribute('class', 'table');
        table.setAttribute('style', 'text-align: center');
        
        var thead = document.createElement('thead');
        thead.setAttribute('class', 'thead-dark');

        //creating row for table heading
        var tr = document.createElement('tr');
 
        //creating columns for table
        var th = createth('th', 'Name of Book');
        var th1 = createth('th', 'ISBN');
        var th2 = createth('th', 'Number Of Pages');
        var th3 = createth('th', 'Authors');
        var th4 = createth('th', 'Publisher Name');
        var th5 = createth('th', 'Released Date');

        //function to assign value to table heading
        function createth(elementname, value = " ") {
            var ele = document.createElement(elementname);
            ele.innerHTML = value;
            return ele;
        }

        //appending thead in tbody
        tr.append(th, th1, th2, th3, th4, th5);
        thead.append(tr);
        var tbody = document.createElement('tbody');

        //nested for loop for extracting books url and fetching it using fetch to display its elements.
        for (var i = 0; i < data1.length; i++) {
            var a = data1[i].books;
            console.log(a);
            for (var j = 0; j < a.length; j++) {
                b = a[j];
                let data2 = await fetch(b);
                let data3 = await data2.json();

                // console.log(data3.name + "" + data3.isbn + "" + data3.numberOfPages + "" + data3.authors + "" + data3.publisher + "" + data3.released);

                //creating row for elements
                var tr1 = document.createElement('tr');

                //creating columns for elements
                var td = createtr('td', data3.name);
                var td1 = createtr('td', data3.isbn);
                var td2 = createtr('td', data3.numberOfPages);
                var td3 = createtr('td', data3.authors);
                var td4 = createtr('td', data3.publisher);
                var td5 = createtr('td', data3.released);

                //appending all columns into row and body in head in table
                tr1.append(td, td1, td2, td3, td4, td5);
                tbody.append(tr1);
                table.append(thead, tbody);

                //function to assign value in columns
                function createtr(elementname, value = " ") {
                    var ele = document.createElement(elementname);
                    ele.innerHTML = value;
                    return ele;
                }
            }

        }
        //appending table in container and displaying it in browser
        container.append(table);
        document.body.append(container);
    }
    //catch function to handle error
    catch (error) {
        console.log(error);
    }
}

foo();
