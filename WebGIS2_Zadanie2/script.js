require ([
    "esri/Map",
    "esri/views/SceneView",
    'dijit/form/Button',
    "esri/layers/FeatureLayer",
    "esri/tasks/support/Query",
    "esri/layers/GraphicsLayer",
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/widgets/Legend',
    "esri/renderers/Renderer",
    "esri/renderers/visualVariables/ColorVariable",
    'esri/widgets/LayerList',
    'esri/widgets/Search'
],(
    Map, SceneView, Button, FeatureLayer, Query, GraphicsLayer, Renderer, ColorVariable, Legend, Expand, BasemapGallery, LayerList, Search) => {
    let map = new Map({
        basemap: "osm",
      });
    
      let view = new SceneView({
        map: map,
        container: "map",
        center: [-97.268976, 39.758241],
        zoom: 4,
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

    let g1 = new GraphicsLayer();
      
    let f1 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    }) ;

    let f2 = new FeatureLayer({
        url: "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0"
    }) ;
    map.add(f2);

    //Widzety

    // const bmWg = new BasemapGallery({
    //     view: view
    // });

    // const expandWg = new Expand({
    //     view: view,
    //     content: bmWg
    // });

    // view.ui.add(expandWg, {
    //     position:"top-right"
    // });

    const searchWidget = new Search({
        view: view
        });
        view.ui.add(searchWidget, {
        position: "top-right",
        index: 2
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

    //query

    let query = f1.createQuery();
    query.where = "MAGNITUDE > 4";
    query.outFields = [ "*" ];
    query.returnGeometry = true;

    f1.queryFeatures(query)
    .then(response =>{
        getResults(response.features);

    })
    .catch(err =>{
        console.log(err);
    });

    let getResults = (features) => {
        let symbol = {
            type: 'simple-marker',
            size: 5,
            color: "green",
            style: "circle"
        };

        features.map(elem => {
            elem.symbol = symbol;
        });

        g1.addMany(features)

    };

    let renderer = {
        type: "simple",
        symbol: {
            type: 'point-3d',
            symbolLayers: [
                {
                    type: "object",
                    resource: {
                        primitive: "cylinder"
                    },
                    width: 5000
                }

            ]
        },
        label: 'Earthquakes',
        visualVariables: [
            {
                type: "color",
                field: "MAGNITUDE",
                stops: [
                    {
                        value: 0.5,
                        color: "green",
                    },
                    {
                        value: 4.48,
                        color: "red"
                    }
                ]
            },
            {
                type: "size",
                field: "DEPTH",
                stops: [
                    {
                        value: -3.39,
                        size: 100000
                    },
                    {
                        value: 30.97,
                        size: 200000
                    }
                ]
            }
        ]
    };

    f2.renderer = renderer;

}   
)