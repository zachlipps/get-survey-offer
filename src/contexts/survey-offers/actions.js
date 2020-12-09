import $ from 'jquery'

const fetchSurvey = async (userIdentifier) => {
  let response

  // went with ajax for simplicity
  try {
    response = await $.ajax({
      url: 'https://www.tapresearch.com/supply_api/surveys/offer',
      dataType: 'jsonp',
      data: {
        api_token: '9a7fb35fb5e0daa7dadfaccd41bb7ad1',
        user_identifier: userIdentifier,
      },
      method: 'POST',
    })
  } catch (err) {
    return { hasError: true }
  }

  return response
}

export { fetchSurvey }
