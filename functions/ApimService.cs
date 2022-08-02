using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MyAmbassadorDemo.Function
{
    internal class ApimService
    {
        private readonly string _baseUrl;
        private readonly string _subscriptionKey;
        private readonly HttpClient _httpClient;

        public ApimService(string baseUrl, string subscriptionKey, string identityToken = null)
        {
            _baseUrl = baseUrl;
            _subscriptionKey = subscriptionKey;
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri(_baseUrl);
            _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);
        }

        public async Task<string> GetTokenBackAsync(string providerId, string authorizationId)
        {
            var endpoint = $"{_baseUrl}/tokenstore/fetch?authorizationProviderId={providerId}&authorizationId={authorizationId}";
            var response = await _httpClient.PostAsync(endpoint, null);
            var content = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Fetch token call unsuccessful: {content}");
            }
            return content;
        }

        public async Task<GithubDiscussionComment[]> ListDiscussionCommentsAsync() 
        {
    
            var response = await _githubGraphQLClient.SendQueryAsync<JObject>(request);
            var comments = response.Data["repository"]["discussion"]["comments"]["nodes"].ToObject<GithubDiscussionComment[]>();
            return comments;
        }

        
        public async Task<bool> PostDiscussionCommentAsync(string[] aliases) 
        {
            var body = string.Join(',', aliases);
            var query = $"mutation {{ addDiscussionComment(input: {{ body: \"{body}, Thanks for giving feedback!\", discussionId: \"D_kwDOHiNKns4AP3wj\" }}) {{comment {{ url }} }} }}";
            var request = new GraphQLRequest() {
                Query = query
            };
            var response = await _githubGraphQLClient.SendQueryAsync<JObject>(request);
            return true;
        }
    }
}