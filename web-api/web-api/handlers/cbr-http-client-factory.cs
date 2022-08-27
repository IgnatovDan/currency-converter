namespace Handlers;

public interface ICbrHttpClientFactory {
  HttpClient CreateHttpClient();
}

public class CbrHttpClientFactory : ICbrHttpClientFactory {
  public HttpClient CreateHttpClient() {
    return new HttpClient();
  }
}
