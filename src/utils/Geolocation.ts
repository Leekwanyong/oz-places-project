function getLocation(): Promise<{ userLat: number; userLng: number }> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("현재 브라우저에서 Geolocation이 지원되지 않습니다."));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                resolve({ userLat, userLng });
            },
            (error) => {
                let errorMessage = "알 수 없는 오류가 발생했습니다!";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "사용자가 Geolocation API의 사용 요청을 거부했습니다!";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "위치 정보를 사용할 수 없습니다!";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다!";
                        break;
                }
                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}

export default getLocation;
