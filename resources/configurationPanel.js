{
	"configurationSettings": [{
		"category": "<b>General</b>",
		"fields": [{
			"type": "group",
			"label": "Select a group",
			"tooltip": "Group displayed in the application"
		}, {
			"type": "conditional",
			"condition": false,
			"fieldName": "showHeader",
			"label": "Show Application Header",
			"items": [{
				"type": "string",
				"fieldName": "headerText",
				"label": "Application title",
				"tooltip": "Title displays in application header"
			}, {
				"type": "string",
				"fieldName": "headerTextURL",
				"label": "Header title URL",
				"tooltip": "A location for the gallery title to link to"
			}]
		}]
	}, {
		"category": "<b>Theme</b>",
		"fields": [{
			"label": "Header text color",
			"tooltip": "Set header text color",
			"type": "color",
			"sharedThemeProperty": "header.text",
			"fieldName": "headerTextColor"
		}, {
			"label": "Header background color",
			"fieldName": "headColor",
			"type": "color",
			"tooltip": "Color of header bar",
			"sharedThemeProperty": "header.background"
		}, {
			"label": "Item Summary text color",
			"fieldName": "linkColor",
			"type": "color",
			"sharedThemeProperty": "body.link",
			"tooltip": "The color for item summary text on each card."
		}, {
			"label": "Item Owner text color",
			"tooltip": "Set text color for the owner of the item",
			"type": "color",
			"sharedThemeProperty": "body.text",
			"fieldName": "fontColor"
		}, {
			"label": "Gallery background color",
			"tooltip": "The background color of the gallery, this will let you apply a color behind the cards",
			"type": "color",
			"sharedThemeProperty": "body.background",
			"fieldName": "bgColor"
		}, {
			"label": "Gallery navigation background color",
			"fieldName": "buttonBgColor",
			"type": "color",
			"sharedThemeProperty": "button.background",
			"tooltip": "The background color for the gallery pagination controls."
		}, {
			"label": "Gallery navigation current page text color",
			"fieldName": "buttonTextColor",
			"type": "color",
			"sharedThemeProperty": "button.text",
			"tooltip": "The color for text appearing on button of the selected page in gallery pagination controls"
		}, {
			"type": "conditional",
			"condition": false,
			"fieldName": "headerImage",
			"label": "Show Header Logo",
			"items": [{
				"type": "string",
				"fieldName": "headerImageLocation",
				"label": "Logo URL",
				"sharedThemeProperty": "logo.small",
				"tooltip": "The URL for the image to be displayed next to the gallery title."
			}]
		}, {
			"type": "subcategory",
			"label": "Card Colors"
		}, {
			"label": "Card background color",
			"fieldName": "cardColor",
			"type": "color",
			"tooltip": "The background color of the cards shown in the gallery for each item."
		}, {
			"label": "Web App caption color",
			"fieldName": "appCaptionColor",
			"type": "color",
			"tooltip": "The color of the card caption for the 'Web Mapping Application' item type."
		}, {
			"label": "Map caption color",
			"fieldName": "mapCaptionColor",
			"type": "color",
			"tooltip": "The color of the card caption for the 'Web Map' item type."
		}, {
			"label": "Scene caption color",
			"fieldName": "sceneCaptionColor",
			"type": "color",
			"tooltip": "The color of the card caption for the 'Web Scene' item type."
		}, {
			"label": "Caption color for other item types",
			"fieldName": "fileCaptionColor",
			"type": "color",
			"tooltip": "The color of the card caption for any item type that is not Map, Scene, or App."
		}, {
			"label": "Caption text color",
			"fieldName": "captionTextColor",
			"type": "color",
			"tooltip": "The color of the text displaying the item type in the card caption."
		}]
	}, {
		"category": "<b>Options</b>",
		"fields": [{
			"type": "subcategory",
			"label": "Gallery settings"
		}, {
			"type": "conditional",
			"condition": false,
			"fieldName": "headerSearch",
			"label": "Enable Header Search",
			"items": [{
				"type": "string",
				"fieldName": "searchPlaceholder",
				"label": "Placeholder Text",
				"tooltip": "The text shown in the search input when nothing has been entered"
			}]
		}, {
			"type": "conditional",
			"condition": false,
			"fieldName": "showAgolLink",
			"label": "Display a link to ArcGIS Org",
			"tooltip": "Boolean controlling whether or not the display a link to ArcGIS Online (or a custom URL) next to the gallery title.",
			"items": [{
				"type": "string",
				"fieldName": "agolLinkText",
				"label": "Link Text",
				"tooltip": "The text displayed for the link to ArcGIS Online (or custom URL)"
			}, {
				"type": "string",
				"fieldName": "agolLinkLocation",
				"label": "ArcGIS Link URL",
				"tooltip": "The URL for the link displayed next to the gallery title."
			}]
		}, {
			"type": "conditional",
			"condition": false,
			"label": "Open items full screen",
			"fieldName": "alwaysOpenFullscreen",
			"tooltip": "If true, maps, apps, scenes, and dashboards will always be opened fullscreen instead of in the gallery",
			"items": [{
				"label": "Open all items full screen in a new tab",
				"fieldName": "openFullscreenSeparateTab",
				"type": "boolean",
				"tooltip": "If true, opening maps, apps and scenes from the gallery fullscreen will always create a new tab"
			}]
		}, {
			"type": "boolean",
			"fieldName": "openDocumentLinksDirectly",
			"label": "Open document link item type in browser",
			"tooltip": "Controls whether or not document cards will open the ArcGIS item page for document link types (default) or open the document link directly."
		}, {
			"type": "boolean",
			"fieldName": "showItemTitle",
			"label": "Show the item title",
			"tooltip": "Controls whether or not the item title will be displayed on each card"
		}, {
			"type": "boolean",
			"fieldName": "showItemPageLink",
			"label": "Show item info button on card",
			"tooltip": "Controls whether or not the card has an info button which links to item page "
		}, {
			"label": "Show owner of each item",
			"fieldName": "showAuthor",
			"type": "boolean",
			"tooltip": "Controls whether or not the author will be shown under the item title of each gallery card"
		}, {
			"type": "conditional",
			"condition": false,
			"fieldName": "showItemSummary",
			"label": "Show the item summary on the card below the title",
			"tooltip": "Controls whether or not the item summary (if it exists) is included on the card.",
			"items": [{
				"label": "Optionally change character count at which the item summary is truncated on the card. ",
				"fieldName": "summaryTruncLength",
				"type": "string",
				"tooltip": "In most cases, you will not need to change the default, but this lets you set a character count at which to truncate the item summary.",
				"placeholder": "100"
			}]
		}, {
			"type": "conditional",
			"condition": false,
			"label": "Show item summary tool tip",
			"fieldName": "showSummaryTooltip",
			"tooltip": "Controls whether or not the item summary will be availble as a tooltip",
			"items": [{
				"label": "Optionally change character count at which the item summary is truncated.",
				"fieldName": "tooltipTruncLength",
				"type": "string",
				"tooltip": "In most cases, you will not need to change the default, but this lets you set a character count at which to truncate the item summary tool tip.",
				"placeholder": "1000"
			}]
		}, {
			"type": "conditional",
			"condition": false,
			"label": "Show item type label",
			"fieldName": "showItemType",
			"tooltip": "Controls whether or not the item type label will be shown on each gallery card",
			"items": [{
				"label": "Show item type label below thumbnail",
				"fieldName": "itemTypeBelowThumbnail",
				"type": "boolean",
				"tooltip": "If true it will be displayed below the thumbnail. If false, it will be displayed over the thumbnail and fade out on mouse-over. "
			}]
		}, {
			"label": "Define number of items per page",
			"fieldName": "itemsPerPage",
			"type": "string",
			"tooltip": "Controls The number of items to display per gallery page",
			"placeholder": "20"
		}, {
			"label": "Sort gallery items by",
			"fieldName": "sortField",
			"type": "string",
			"options": [{
				"label": "Modified Date",
				"value": "modified"
			}, {
				"label": "Number of Views",
				"value": "numViews"
			}, {
				"label": "Name",
				"value": "title"
			}],
			"tooltip": "Default sort method for gallery contents"
		}, {
			"label": "Gallery items order",
			"fieldName": "sortOrder",
			"type": "string",
			"options": [{
				"label": "Descending",
				"value": "desc"
			}, {
				"label": "Ascending",
				"value": "asc"
			}],
			"tooltip": "Sorting order of gallery contents"
		}, {
			"type": "string",
			"fieldName": "itemTypes",
			"tooltip": "Only display items of this type",
			"label": "Only display items of this type *",
			"options": [{
				"label": "All",
				"value": ""
			}, {
				"label": "Apps",
				"value": "Web Mapping Application, Mobile Application, Code Attachment, Operations Dashboard Add In, Operation View,Operations Dashboard Extension, Native Application, Native Application Template, Native Application Installer, Workforce Project, Form, Insights Workbook, Insights Model, Insights Page, Dashboard, Hub Initiative, Hub Site Application, Hub Page, AppBuilder Widget Package"
			}, {
				"label": "Data Files",
				"value": "Symbol Set, Color Set, Shapefile, File Geodatabase, CSV, CAD Drawing, Service Definition, Document Link, Microsoft Word, Microsoft Powerpoint, Microsoft Excel, PDF, Image, Visio Document, iWork Keynote, iWork Pages, iWork Numbers, Report Template, Statistical Data Collection, SQLite Geodatabase, Content Category Set"
			}, {
				"label": "Desktop Content",
				"value": "Map Document, Map Package, Mobile Basemap Package, Mobile Map Package, Tile Package, Vector Tile Package, Project Package, Task File, ArcPad Package, Explorer Map, Globe Document, Scene Document, Published Map, Map Template, Windows Mobile Package, Pro Map, Layout, Project Template, Layer, Layer, Layer Package,Explorer Layer, Scene Package,Image Collection, Desktop Style, Geoprocessing Package, Geoprocessing Package (Pro version), Geoprocessing Sample, Locator Package, Rule Package, Raster function template, ArcGIS Pro Configuration, Workflow Manager Package, Desktop Application, Desktop Application Template, Code Sample, Desktop Add In, Explorer Add In, ArcGIS Pro Add In"
			}, {
				"label": "Layers",
				"value": "Feature Service, Map Service, Image Service, KML, KML Collection, WMS, WFS, WMTS, Feature Collection, Feature Collection Template, Geodata Service, Globe Service, Vector Tile Service, Scene Service, Relational Database Connection"
			}, {
				"label": "Maps",
				"value": "Web Map, Web Scene, CityEngine Web Scene, 360 VR Experience, Pro Map, Map Area"
			}, {
				"label": "Tools",
				"value": "Geometry Service, Geocoding Service, Network Analysis Service, Geoprocessing Service, Workflow Manager Service"
			}]
		}, {
			"type": "paragraph",
			"value": "* Groups can contain items that are not always informative to your audience, for example you may want to just show apps without presenting the layers and web maps they are built on.  This gallery can be configured to show items of a certain classification and hide others.  For more information on the types see this help topic on <a href='https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm' target='_blank'>Items and item types</a>. "
		}, {
			"type": "subcategory",
			"label": "Map viewer settings"
		}, {
			"label": "Compass placement",
			"fieldName": "compassWidget",
			"type": "string",
			"options": [{
				"label": "Top Left",
				"value": "top-left"
			}, {
				"label": "Top Right",
				"value": "top-right"
			}, {
				"label": "Bottom Right",
				"value": "bottom-right"
			}, {
				"label": "Bottom Left",
				"value": "bottom-left"
			}],
			"tooltip": "Controls the placement of a Compass widget on gallery-embedded or fullscreen maps and scenes."
		}, {
			"label": "Home Button placement",
			"fieldName": "homeWidget",
			"type": "string",
			"options": [{
				"label": "Top Left",
				"value": "top-left"
			}, {
				"label": "Top Right",
				"value": "top-right"
			}, {
				"label": "Bottom Right",
				"value": "bottom-right"
			}, {
				"label": "Bottom Left",
				"value": "bottom-left"
			}],
			"tooltip": "Controls the placement of a Home button on gallery-embedded or fullscreen maps and scenes."
		}, {
			"label": "Legend placement",
			"fieldName": "legendWidget",
			"type": "string",
			"options": [{
				"label": "Top Left",
				"value": "top-left"
			}, {
				"label": "Top Right",
				"value": "top-right"
			}, {
				"label": "Bottom Right",
				"value": "bottom-right"
			}, {
				"label": "Bottom Left",
				"value": "bottom-left"
			}],
			"tooltip": "Controls the placement of a Legend on gallery-embedded or fullscreen maps and scenes."
		}, {
			"label": "Locate Button placement",
			"fieldName": "locateWidget",
			"type": "string",
			"options": [{
				"label": "Top Left",
				"value": "top-left"
			}, {
				"label": "Top Right",
				"value": "top-right"
			}, {
				"label": "Bottom Right",
				"value": "bottom-right"
			}, {
				"label": "Bottom Left",
				"value": "bottom-left"
			}],
			"tooltip": "Controls the placement of a Locate button on gallery-embedded or fullscreen maps and scenes."
		}, {
			"label": "Search widget placement",
			"fieldName": "searchWidget",
			"type": "string",
			"options": [{
				"label": "Top Left",
				"value": "top-left"
			}, {
				"label": "Top Right",
				"value": "top-right"
			}, {
				"label": "Bottom Right",
				"value": "bottom-right"
			}, {
				"label": "Bottom Left",
				"value": "bottom-left"
			}],
			"tooltip": "Controls the placement of a Search Widget on gallery-embedded or fullscreen maps and scenes."
		}, {
			"label": "Basemap group",
			"fieldName": "basemapGroupTitle",
			"type": "string",
			"tooltip": "Name of a public group containing basemaps, or leave blank to use the organization's basemap group",
			"placeholder": "Default organization basemaps"
		}, {
			"label": "Basemap group owner",
			"fieldName": "basemapGroupOwner",
			"type": "string",
			"tooltip": "Username of basemap group owner",
			"placeholder": "Default organization basemaps"
		}]
	}],
	"values": {
		"bgColor": "#ffffff",
		"cardColor": "#ffffff",
		"appCaptionColor": "#292b2c",
		"mapCaptionColor": "#0275d8",
		"sceneCaptionColor": "#5cb85c",
		"fileCaptionColor": "#d9534f",
		"captionTextColor": "#ffffff",
		"fontColor": "#000000",
		"headColor": "#ffffff",
		"linkColor": "#0079c1",
		"buttonBgColor": "#0079c1",
		"buttonTextColor": "#ffffff",
		"showAuthor": true,
		"sortOrder": "asc",
		"sortField": "title",
		"showHeader": true,
		"alwaysOpenFullscreen": false,
		"openFullscreenSeparateTab": false,
		"showItemPageLink": true,
		"showItemTitle": true,
		"showItemType": true,
		"itemTypeBelowThumbnail": true,
		"headerText": "Group Gallery",
		"headerTextColor": "#000000",
		"headerTextURL": "https://www.arcgis.com/",
		"headerImage": true,
		"headerImageLocation": "http://www.arcgis.com/sharing/rest/community/groups/db0e225e408c4ecea055088cd4d09b84/info/Screenshot_2015-10-28_09.36.16.png",
		"headerSearch": true,
		"searchPlaceholder": "Search",
		"showAgolLink": true,
		"agolLinkText": "View on ArcGIS Online",
		"agolLinkLocation": "http://www.arcgis.com/home/group.html?id=${GROUP_ID}",
		"showItemSummary": false,
		"summaryTruncLength": 100,
		"showSummaryTooltip": true,
		"tooltipTruncLength": 1000,
		"compassWidget": "",
		"homeWidget": "top-left",
		"legendWidget": "bottom-right",
		"locateWidget": "top-left",
		"searchWidget": "bottom-left",
		"openDocumentLinksDirectly": false
	}
}