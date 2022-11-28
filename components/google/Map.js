import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React from "react";

export function Map(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_ApiKey,
    url: `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_ApiKey}&v=3.exp&libraries=geometry,drawing,places`,
  });

  return (
    isLoaded && (
      <GoogleMap
        id={props?.mapid}
        mapContainerStyle={props?.mapContainerStyle}
        zoom={props?.zoom}
        center={props?.center}
      >
        {/* {props?.markers?.map((data, index) => (
          <MarkerF position={data} key={index} />
        ))} */}

        {props.children}
      </GoogleMap>
    )
  );
}
