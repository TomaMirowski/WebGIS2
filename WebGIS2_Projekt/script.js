require([
    'esri/Map',
    'esri/views/MapView',
    'dijit/form/Button',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/widgets/Legend',
    'esri/widgets/LayerList',
    'esri/widgets/Search',
    "esri/PopupTemplate",
    "esri/widgets/DistanceMeasurement2D"
], (Map, MapView, Button, FeatureLayer, GraphicsLayer, BasemapGallery, Expand, Legend, LayerList, Search, PopupTemplate, DistanceMeasurement2D) =>{


    let map = new Map({
        basemap: "osm",
        });
    
        let view = new MapView({
        map: map,
        container: "map",
        center: [-122.268976, 43.758241],
        zoom: 5,
        popup: {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false
            }
        }
        });

    const zoomIn = new Button({
        onClick: () => {
            view.zoom = view.zoom + 1
        }
    }, "zoomIn");

    const zoomOut = new Button({
        onClick: () => {
            view.zoom = view.zoom - 1
        }
    }, "zoomOut");

    //Warstwy
    const gl = new GraphicsLayer();

    let zmienna = new PopupTemplate({
        title: "{Name}"
        
    })

    const fl = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/cascade_volcanoes/FeatureServer",
        popupTemplate: zmienna
    });

    map.add(fl);

    //Widzety

    const bmWg = new BasemapGallery({
        view: view
    });

    const expandWg = new Expand({
        view: view,
        content: bmWg
    });

    const searchWidget = new Search({
        view: view
        });
        view.ui.add(searchWidget, {
        position: "top-right",
        index: 2
    });

    view.ui.add(expandWg, {
        position:"top-right"
    });

    const legend = new Legend({
        view: view
    });

    view.ui.add(legend, {position: "bottom-right"});

    let layerList = new LayerList({
        view: view
        });

    view.ui.add(layerList, {
    position: "bottom-left"
    });

    let measurementWidget = new DistanceMeasurement2D({
        view: view,
      });
      let expandMA = new Expand({
        view: view,
        content: measurementWidget,
      });
      view.ui.add(expandMA, "top-right");

    let btn1 = document.getElementById('btn1');
    btn1.addEventListener('click', function(){
        view.center = [-121.70, 45.37],
        view.zoom = 10
    });
    let btn2 = document.getElementById('btn2');
    btn2.addEventListener('click', function(){
        view.center = [-121.55, 41.61],
        view.zoom = 10
    });
    let btn3 = document.getElementById('btn3');
    btn3.addEventListener('click', function(){
        view.center = [-121.51, 40.79],
        view.zoom = 10
    });
    let btn4 = document.getElementById('btn4');
    btn4.addEventListener('click', function(){
        view.center = [-121.11, 48.11],
        view.zoom = 10
    });
    let btn5 = document.getElementById('btn5');
    btn5.addEventListener('click', function(){
        view.center = [-121.80, 46.67],
        view.zoom = 10
    });
    let btn6 = document.getElementById('btn6');
    btn6.addEventListener('click', function(){
        view.center = [-122.69, 43.98],
        view.zoom = 10
    });
})