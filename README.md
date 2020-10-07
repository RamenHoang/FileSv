# FileSv

## post: /api/aut/login
- body: {username, password}
- return: {accessToken, refreshToken}

## post: /api/aut/token/refresh
- body: {refreshToken}
- return: {newAccessToken}

## post: /api/file/upload
- header: {Authentication: 'paste access token here'}
- body: {myFile: FormData}
- return: success/failure

## post: /api/file/get?limit
- header: {Authentication: 'paste access token here'}
- return: [files] // files which are uploaded by aut user who claims above access token 
