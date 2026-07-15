import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import patinhaLogo from "../../assets/images/patinha-logo-transp.png";
import { cuidadosCategorias } from "../../data/cuidadosCategorias";
import "./Cuidados.css";

/*
  Página de Cuidados: uma wiki de consulta sobre adoção responsável e
  cuidados com cães, gatos, roedores/coelhos e aves. O menu lateral usa
  scroll-spy (IntersectionObserver) pra destacar a categoria que está sendo
  lida, e vira um menu retrátil em telas pequenas.
*/
function Cuidados() {
  const [categoriaAtiva, setCategoriaAtiva] = useState(cuidadosCategorias[0].id);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const secoes = cuidadosCategorias
      .map((categoria) => document.getElementById(categoria.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries.filter((entry) => entry.isIntersecting);

        if (visiveis.length === 0) {
          return;
        }

        const maisProximaDoTopo = visiveis.reduce((atual, proxima) =>
          proxima.boundingClientRect.top < atual.boundingClientRect.top
            ? proxima
            : atual
        );

        setCategoriaAtiva(maisProximaDoTopo.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    secoes.forEach((secao) => observer.observe(secao));

    return () => observer.disconnect();
  }, []);

  function handleLinkClick() {
    setMenuAberto(false);
  }

  return (
    <div className="cuidados-page">
      <button
        type="button"
        className="cuidados-menu-toggle"
        onClick={() => setMenuAberto((atual) => !atual)}
        aria-expanded={menuAberto}
      >
        ☰ Categorias
      </button>

      <aside className={`cuidados-sidebar${menuAberto ? " cuidados-sidebar--aberta" : ""}`}>
        <Link to="/" className="cuidados-brand" onClick={handleLinkClick}>
          <img src={patinhaLogo} alt="" aria-hidden="true" />
          <span>
            Find<strong>Pet</strong>
          </span>
        </Link>

        <p className="cuidados-sidebar__label">Categorias</p>

        <nav aria-label="Categorias de cuidados">
          {cuidadosCategorias.map((categoria) => (
            <a
              key={categoria.id}
              href={`#${categoria.id}`}
              onClick={handleLinkClick}
              className={
                categoriaAtiva === categoria.id ? "cuidados-link--ativo" : ""
              }
            >
              {categoria.label}
            </a>
          ))}
        </nav>

        <Link to="/" className="cuidados-sidebar__voltar" onClick={handleLinkClick}>
          ← Voltar para início
        </Link>
      </aside>

      {menuAberto && (
        <div
          className="cuidados-menu-backdrop"
          onClick={() => setMenuAberto(false)}
          aria-hidden="true"
        />
      )}

      <main className="cuidados-content">
        <header className="cuidados-header">
          <p className="cuidados-eyebrow">Guia de cuidados</p>
          <h1>Guia completo de adoção responsável</h1>
          <p className="cuidados-subtitulo">
            Cães, gatos, roedores e aves — tudo o que vale saber antes e
            depois de adotar, reunido num só lugar.
          </p>
        </header>

        <section id="adocao-responsavel" className="cuidados-secao">
          <h2>O que é adoção responsável</h2>
          <p>
            Adotar de forma responsável vai muito além de acolher um animal
            por impulso ou emoção do momento. Envolve planejamento,
            consciência e compromisso de longo prazo — entender que cães,
            gatos e qualquer outro bichinho são seres vivos, com sentimentos
            e necessidades físicas e emocionais, que dependem inteiramente do
            tutor para viver com saúde e segurança.
          </p>
          <p>
            O cenário brasileiro ajuda a entender por que isso importa:
            estima-se que existam mais de 30 milhões de cães e gatos em
            situação de abandono no país — cerca de 20 milhões de cães e 10
            milhões de gatos —, e o número de abandonos cresceu em média 60%
            durante a pandemia. Grande parte dessas adoções foi feita por
            impulso e terminou em devolução ou abandono, algo extremamente
            traumático para o animal e que pode gerar problemas
            comportamentais e emocionais duradouros.
          </p>
        </section>

        <section id="antes-de-adotar" className="cuidados-secao">
          <h2>Antes de adotar</h2>
          <p>
            Antes de levar um animal para casa, vale parar e avaliar alguns
            pontos com calma. Esse cuidado inicial evita boa parte dos casos
            de devolução e abandono mais adiante.
          </p>
          <ul>
            <li>
              <strong>Consenso familiar:</strong> todas as pessoas que moram
              na casa precisam estar de acordo com a adoção — isso evita que
              o animal sofra rejeição, maus-tratos ou até abandono.
            </li>
            <li>
              <strong>Disponibilidade de tempo:</strong> cuidar de um animal
              vai muito além de colocar comida e água nos potinhos. Exige
              atenção para passeios, brincadeiras, limpeza do ambiente e
              idas ao veterinário — os exercícios físicos previnem a
              obesidade e trabalham os lados social e mental do pet.
            </li>
            <li>
              <strong>Espaço adequado:</strong> pense em onde o animal vai
              passar a maior parte do tempo e a quais áreas terá acesso.
              Cães precisam de espaço para correr e explorar; gatos
              precisam de um cantinho só deles, longe de situações
              estressantes — a palavra-chave é enriquecimento ambiental.
            </li>
            <li>
              <strong>Condições financeiras:</strong> um pet demanda
              recursos com alimentação, brinquedos, saúde, treinamento e
              possíveis emergências. Além do dia a dia, entram na conta
              castração, vacinas anuais, vermífugos, antipulgas e
              banho/tosa periódicos.
            </li>
            <li>
              <strong>Compromisso vitalício:</strong> cães e gatos bem
              cuidados podem viver até 20 anos. Adotar é um compromisso para
              a vida toda, inclusive na velhice do animal, quando ele pode
              demandar ainda mais atenção.
            </li>
            <li>
              <strong>Escolha compatível:</strong> leve em conta idade,
              personalidade, tamanho e nível de energia do animal, buscando
              um que combine com sua casa e seu estilo de vida. E vale abrir
              o coração: animais adultos, sem raça definida, de pelo
              escuro, idosos ou com deficiência costumam esperar mais tempo
              por um lar e podem te surpreender.
            </li>
          </ul>
        </section>

        <section id="cuidados-caes" className="cuidados-secao">
          <h2>Cuidados com cães</h2>

          <h3>Ambiente</h3>
          <p>
            Crie um espaço seguro e tranquilo para o cão descansar, com
            fácil acesso à cama, cobertores, brinquedos e tigelas de água e
            comida. O ideal é um pátio amplo, cercado e coberto, que proteja
            do frio e da chuva. E nada de correntes: nenhum animal é feliz
            acorrentado ou privado do convívio com a família.
          </p>

          <h3>Rotina</h3>
          <p>
            Cães precisam de passeios regulares, socialização e atividades
            que gastem energia física e mental. Cães presos e sozinhos por
            muito tempo tendem a ficar estressados e entediados, o que
            costuma aparecer em comportamentos destrutivos.
          </p>

          <h3>Saúde</h3>
          <p>
            Além da castração e da atualização das vacinas obrigatórias, é
            importante fazer check-ups regulares. Um ponto de atenção: a
            vacinação oferecida em campanhas gratuitas do governo costuma
            ser só a antirrábica, e não imuniza contra outras doenças. As
            vacinas completas devem ser repetidas anualmente, e qualquer
            alteração física ou de comportamento pede uma visita rápida ao
            veterinário.
          </p>

          <h3>Alimentação</h3>
          <p>
            Ofereça ração de qualidade, adequada ao porte e à fase de vida
            do cão (filhote, adulto ou sênior), com água fresca sempre
            disponível. Fique de olho nos alimentos tóxicos para cães:
          </p>
          <ul>
            <li>Chocolate</li>
            <li>Uva e passas</li>
            <li>Cebola e alho</li>
            <li>Café e bebidas com cafeína</li>
            <li>Xilitol (adoçante presente em vários doces)</li>
            <li>Ossos cozidos</li>
            <li>Comida temperada</li>
          </ul>

          <h3>Identificação</h3>
          <p>
            Uma placa de identificação simples na coleira — leve,
            confortável, com o telefone do tutor — ajuda pets perdidos a
            voltarem para casa.
          </p>
        </section>

        <section id="cuidados-gatos" className="cuidados-secao">
          <h2>Cuidados com gatos</h2>

          <h3>Ambiente e segurança</h3>
          <p>
            O item mais crítico para gatos é o telamento. Portas, janelas e
            sacadas devem ser teladas para que o gato não tenha acesso à
            rua, evitando fugas, quedas, atropelamentos, transmissão de
            doenças e envenenamento.
          </p>

          <h3>Enriquecimento ambiental</h3>
          <p>
            Gatos precisam de um ambiente enriquecido, com arranhadores,
            prateleiras, brinquedos e estímulos que simulem seus
            comportamentos naturais de caça. A caixa de areia deve estar
            sempre limpa — a regra prática é uma caixa por gato, mais uma
            extra —, além de tocas, esconderijos e locais elevados para eles
            observarem o ambiente com segurança.
          </p>

          <h3>Companhia</h3>
          <p>
            Gatos dormem bastante e se adaptam melhor à ausência do tutor do
            que os cães, mas também sentem falta de companhia. Uma boa dica
            é adotar dois gatos, para que um faça companhia ao outro — os
            gastos extras são pequenos perto do ganho em bem-estar.
          </p>

          <h3>Alimentação</h3>
          <p>
            Use ração específica para felinos: gatos são carnívoros estritos
            e precisam de nutrientes como a taurina, ausente em rações
            caninas. Deixe água fresca disponível em vários pontos da casa —
            fontes de água ajudam bastante, já que gatos bebem pouco
            naturalmente e são propensos a problemas renais. Leite de vaca
            não é indicado, e plantas como lírios são extremamente tóxicas
            para eles.
          </p>

          <h3>Castração e saúde</h3>
          <p>
            A castração reduz o risco de diversas doenças, deixa o animal
            mais calmo e caseiro, e ajuda a combater a superpopulação de
            gatos nas ruas — uma única gata pode ter até 10 filhotes por
            ano.
          </p>
        </section>

        <section id="cuidados-roedores" className="cuidados-secao">
          <h2>Roedores e coelhos</h2>
          <p>
            Uma curiosidade que ajuda a entender esse grupo: coelhos não são
            roedores, e sim lagomorfos — mas na prática os cuidados costumam
            ser tratados juntos. É também o grupo em que mais se erra no
            manejo: muitos tutores não sabem que esses animais têm
            necessidades bem específicas, e eles acabam desenvolvendo
            problemas de saúde por falta de informação.
          </p>

          <h3>Porquinho-da-índia</h3>
          <p>
            O porquinho-da-índia não é um "hamster maior" — é um herbívoro
            estrito, que precisa de suplementação de vitamina C, desgaste
            dentário contínuo e atenção à saúde psicossocial.
          </p>
          <ul>
            <li>
              O feno precisa estar disponível 24 horas por dia, em
              quantidade ilimitada: os dentes desses animais crescem sem
              parar, e sem fibra abrasiva suficiente surge a maloclusão
              dentária.
            </li>
            <li>
              Ficar mais de 12 horas sem comer pode levar o animal à estase
              gastrointestinal, uma das emergências mais letais da espécie.
            </li>
            <li>
              Assim como os humanos, porquinhos-da-índia não produzem a
              própria vitamina C. A falta dela causa articulações inchadas,
              letargia, sangramento nas gengivas e imunidade fragilizada.
            </li>
            <li>
              Precisam de espaço horizontal para correr — cercados modulares
              são ideais — e nunca devem ficar em piso de grade, que causa
              pododermatite e pode evoluir para infecção óssea.
            </li>
            <li>
              São sensíveis ao frio: a gaiola deve ficar longe de correntes
              de ar, entre 18°C e 24°C, sem sol direto.
            </li>
            <li>São sociáveis e preferem viver em pares ou grupos do mesmo sexo.</li>
            <li>
              Verduras escuras e folhosas são as preferidas, por terem mais
              vitaminas. Alface não é indicada: tem pouco valor nutricional
              e pode causar diarreia.
            </li>
            <li>Vivem, em média, de 5 a 8 anos.</li>
          </ul>

          <h3>Hamster</h3>
          <p>
            O hamster é pequeno, ágil e precisa de uma gaiola verticalizada,
            com túneis, rodinha, escadas e plataformas. É um animal noturno
            e independente, e deve viver sozinho — dividir espaço com outro
            hamster costuma gerar agressividade. É onívoro: a base da
            alimentação é uma ração extrusada de qualidade, específica para
            a espécie, com água fresca sempre disponível. Use substratos
            como serragem em flocos e ofereça abrigos do tipo toca.
          </p>
          <ul>
            <li>
              Evite serragem de cedro ou pinho, que liberam óleos irritantes
              para as vias respiratórias — papel reciclado é uma alternativa
              mais segura.
            </li>
            <li>A limpeza da gaiola deve ser frequente.</li>
            <li>Vive, em média, de 2 a 3 anos.</li>
          </ul>

          <h3>Coelho</h3>
          <p>
            O coelho é herbívoro e precisa de uma dieta rica em fibras,
            essenciais para o bom funcionamento do intestino. O substrato
            deve ser vegetal — nunca mineral, como a areia usada para gatos,
            que prejudica o sistema respiratório. Pellets de madeira
            específicos costumam ser uma boa solução. A base da alimentação
            é feno à vontade, ração peletizada e verduras.
          </p>
          <p>
            Um ponto importante: não é recomendado alojar coelhos e
            porquinhos-da-índia juntos, já que os coelhos podem transportar
            agentes infecciosos que fazem mal aos porquinhos.
          </p>

          <h3>Chinchila</h3>
          <p>
            Todo o manejo da chinchila deve evitar que o animal se molhe.
            Ela precisa de uma gaiola espaçosa e vertical, e deve ser solta
            do cercado de uma a duas vezes por dia, por 30 minutos a uma
            hora. Não use rodinha de exercício com chinchilas — ela causa
            estresse ao animal. O banho é sempre seco, feito com um pó
            específico para a espécie.
          </p>

          <h3>Higiene geral</h3>
          <p>
            Para todos esses animais vale a mesma regra: limpeza diária de
            fezes e urina, mantendo a gaiola sempre seca para evitar
            doenças, com bebedouros automáticos de boa qualidade. E procure
            sempre um veterinário especialista em animais silvestres e
            exóticos — ele é quem vai orientar sobre manejo, alimentação e
            até saúde dental de cada espécie.
          </p>
        </section>

        <section id="cuidados-aves" className="cuidados-secao">
          <h2>Cuidados com aves</h2>

          <h3>Gaiola e localização</h3>
          <p>
            A capacidade de voar da ave é totalmente prejudicada quando ela
            vive em uma gaiola pequena demais. Quanto maior a gaiola,
            melhor — o ideal é que ela sempre consiga abrir as asas por
            completo e se movimentar à vontade. Evite locais com correntes
            de ar, sol direto, fumaça, cozinha ou aparelhos barulhentos. Mas
            cuidado: ambientes silenciosos demais também não são ideais,
            porque a ave gosta de se sentir parte da rotina da casa. Um
            alerta sério: vapores de panelas antiaderentes superaquecidas
            (teflon) são fatais para aves — mais um bom motivo para
            mantê-las longe da cozinha.
          </p>

          <h3>Enriquecimento ambiental</h3>
          <p>
            Brinquedos coloridos, cordas, poleiros de diferentes espessuras
            e interação diária ajudam a manter a ave equilibrada
            emocionalmente. O tédio pode levá-la a gritar ou até arrancar as
            próprias penas. Prefira poleiros de materiais naturais e
            espessuras variadas — evite os totalmente lisos ou de plástico —
            e troque os brinquedos de vez em quando para evitar o tédio.
          </p>

          <h3>Voo supervisionado</h3>
          <p>
            A ave não deve passar o dia inteiro presa na gaiola. É
            importante que ela tenha momentos livres, fora dela, em um
            espaço preparado: janelas fechadas, ventiladores desligados,
            plantas tóxicas fora de alcance e fios elétricos protegidos.
          </p>

          <h3>Alimentação</h3>
          <p>
            A base da dieta deve ser uma ração extrusada específica para
            psitacídeos, complementada com pequenas porções de sementes
            (como painço e alpiste, e girassol com moderação), além de
            frutas, verduras e legumes variados, que estimulam os sentidos
            da ave. Abacate, chocolate e cafeína são tóxicos para aves, e
            uma dieta baseada só em sementes causa carências nutricionais
            graves e obesidade.
          </p>

          <h3>Sono e saúde</h3>
          <p>
            Cubra a gaiola com um pano leve à noite e respeite o ciclo de
            sono da ave — interrupções frequentes geram estresse, enquanto
            uma rotina previsível traz segurança emocional. Fique atento:
            aves tendem a esconder sinais de doença por instinto, e quando
            os sintomas ficam visíveis, o quadro já costuma estar avançado.
            Preste atenção a apatia, penas eriçadas, permanência no fundo da
            gaiola, perda de apetite, alterações nas fezes e problemas
            respiratórios — e procure um veterinário especializado assim
            que notar qualquer um desses sinais.
          </p>

          <h3>Higiene</h3>
          <p>
            Lave a gaiola e os poleiros semanalmente. A cada 15 dias,
            desinfete os itens de enriquecimento com uma solução de uma
            colher de água sanitária por litro de água, enxaguando e
            secando bem em seguida. Vale oferecer banheiras próprias para a
            ave — a maioria adora se banhar.
          </p>

          <h3>Longevidade</h3>
          <p>
            Uma calopsita pode viver mais de 20 anos, e um papagaio-verdadeiro
            pode passar dos 50. É, literalmente, um compromisso de
            décadas — que deve ser planejado considerando as diferentes
            fases da vida do tutor também.
          </p>
        </section>

        <section id="apresentando-animais" className="cuidados-secao">
          <h2>Apresentando um novo pet aos outros animais da casa</h2>
          <p>
            A regra de ouro, repetida por todas as fontes, é: nunca coloque
            os animais frente a frente logo de cara. Uma apresentação
            abrupta é traumática e gera muito estresse — a introdução
            precisa ser gradual, respeitando o tempo de cada animal.
          </p>

          <h3>Fase 1 — Separação e cheiro</h3>
          <p>
            Dê ao recém-chegado um cômodo só dele por alguns dias, com
            comida, cama, água e (se for o caso) caixa de areia próprias. Os
            animais entendem o mundo principalmente pelo olfato: antes do
            primeiro contato, troque cobertores, brinquedos e acessórios
            entre eles — essa troca de cheiros ajuda a reduzir a
            desconfiança.
          </p>

          <h3>Fase 2 — Contato visual com barreira</h3>
          <p>
            No primeiro dia, proporcione contato visual sem contato
            físico — uma porta de vidro resolve bem. No segundo dia,
            contato físico com barreira, como um portão ou uma caixa de
            transporte. Observe o comportamento dos dois: se estiverem
            calmos, é sinal de que estão prontos para o próximo passo.
          </p>

          <h3>Fase 3 — Encontros supervisionados</h3>
          <p>
            Permita encontros breves e supervisionados, usando guia no caso
            dos cães e deixando saídas de fuga acessíveis para os gatos.
            Aumente o tempo de contato aos poucos, sempre reforçando
            positivamente o bom comportamento. Deixe o gato em um lugar
            alto, onde ele se sinta seguro, e tenha mais de uma pessoa por
            perto para ajudar.
          </p>

          <h3>Dicas complementares</h3>
          <ul>
            <li>
              Determine locais diferentes para a alimentação de cada
              animal, evitando disputas.
            </li>
            <li>Feromônios sintéticos com difusores podem facilitar a aceitação.</li>
            <li>
              Nunca deixe de dar atenção ao animal mais antigo da casa para
              focar só no novato — recompense o veterano primeiro.
            </li>
            <li>A boa gestão de recursos (comida, brinquedos, atenção) evita boa parte das disputas.</li>
            <li>
              Comandos básicos como "senta" e "fica" ajudam a garantir
              segurança durante as interações.
            </li>
            <li>
              Tenha paciência: a adaptação completa pode levar até 90 dias,
              e cada animal tem o seu próprio tempo.
            </li>
          </ul>
        </section>

        <section id="riscos-negligencia" className="cuidados-secao">
          <h2>Riscos da negligência</h2>
          <p>
            A negligência com um animal tem consequências físicas,
            comportamentais — e também legais.
          </p>

          <h3>Para o animal</h3>
          <p>
            A falta de vacinação e vermifugação expõe o animal a doenças
            fatais, como cinomose, parvovirose e raiva. A ausência de
            castração gera ninhadas indesejadas e aumenta o risco de
            doenças reprodutivas. A falta de estímulo costuma causar
            agressividade, comportamento destrutivo, ansiedade ou medo — e
            é dever do tutor buscar ajuda profissional assim que esses
            sinais aparecem. Em espécies pequenas, erros de manejo podem
            matar rapidamente: estase gastrointestinal em porquinhos-da-índia
            e coelhos, arrancamento de penas em aves, pododermatite,
            maloclusão dentária. E animais que fogem por causa de um
            descuido — uma porta aberta, por exemplo — enfrentam riscos
            sérios na rua, e muitos nunca são encontrados.
          </p>

          <h3>Para o tutor</h3>
          <p>
            A lei brasileira é dura com quem maltrata animais. Maus-tratos
            incluem não só agressão física, mas também a privação
            prolongada de cuidados básicos. Maltratar animais é crime,
            conforme a Lei nº 9.605/1998, com pena de três meses a um ano
            de detenção, mais multa. Para cães e gatos especificamente, a
            Lei nº 14.064/2020 — conhecida como Lei Sansão — aumenta a pena
            para reclusão de dois a cinco anos, com multa e proibição da
            guarda do animal. Se o crime resultar na morte do animal, a
            pena ainda pode ser aumentada em até um terço. Abandonar um
            animal também se enquadra nesses crimes.
          </p>
        </section>

        <section id="especies-legalizadas" className="cuidados-secao">
          <h2>Espécies legalizadas no Brasil</h2>
          <p>
            O IBAMA divide os animais em três categorias: domésticos
            (domesticados ao longo do tempo, convivem bem com humanos e não
            exigem registro), silvestres (nativos da fauna brasileira,
            exigem cuidados específicos e autorização mesmo quando criados
            em cativeiro legalizado) e exóticos (vêm de outros países e
            também precisam de registro).
          </p>

          <h3>Roedores e pequenos mamíferos domésticos</h3>
          <p>
            Pela Portaria IBAMA nº 93/1998, os seguintes animais são
            considerados domésticos e podem ser adquiridos livremente, sem
            necessidade de registro:
          </p>
          <ul>
            <li>Hamster (sírio e anões)</li>
            <li>Porquinho-da-índia (Cavia porcellus)</li>
            <li>Chinchila</li>
            <li>Rato twister e camundongo</li>
            <li>Coelho (tecnicamente um lagomorfo, mas também doméstico e liberado)</li>
            <li>Gerbilo / esquilo-da-mongólia</li>
          </ul>
          <p>
            Uma exceção curiosa entre os mamíferos exóticos é o furão
            (ferret): ele é admitido como pet no Brasil desde que importado
            já castrado, já que sua reprodução não é permitida no país.
          </p>

          <h3>Aves domésticas</h3>
          <p>
            A mesma Portaria 93/1998 lista como domésticas as seguintes
            aves, que também não exigem registro:
          </p>
          <ul>
            <li>Calopsita (Nymphicus hollandicus)</li>
            <li>Periquito-australiano (Melopsittacus undulatus)</li>
            <li>Canário-belga / do-reino</li>
            <li>Diamante-de-gould e diamante-mandarim</li>
            <li>Cisne-negro, codorna-chinesa e faisão-de-coleira</li>
          </ul>
          <p>
            O agapornis é um caso à parte: algumas fontes indicam que ele
            pode exigir autorização do IBAMA dependendo do estado, então
            vale confirmar a exigência local antes de adquirir um.
          </p>

          <h3>Aves silvestres permitidas</h3>
          <p>
            Estas espécies podem ser adquiridas legalmente, mas só de
            criadouros autorizados pelo IBAMA ou pelo órgão ambiental
            estadual, com nota fiscal e toda a documentação:
          </p>
          <ul>
            <li>
              Papagaio-verdadeiro (Amazona aestiva) — pode viver mais de 50
              anos e é conhecido por imitar sons
            </li>
            <li>Araras (espécies autorizadas)</li>
            <li>Canário-da-terra (Sicalis flaveola)</li>
            <li>
              Curió (Sporophila angolensis) — exige conhecimento específico
              de nutrição e manejo
            </li>
            <li>
              Cacatua — precisa de autorização do IBAMA; é carinhosa, porém
              barulhenta, e pode ter comportamento destrutivo se ficar
              entediada
            </li>
          </ul>

          <h3>Regras para compra legal</h3>
          <p>
            Ao comprar uma ave silvestre, confira se ela tem anilha,
            microchip ou tatuagem de identificação — é o "RG do bicho" — e
            exija uma nota fiscal com esse número, o nome científico e
            popular da espécie, a data de nascimento e o sexo do animal.
            Depois da compra, o registro no sistema do IBAMA é obrigatório e
            precisa ser feito em até 30 dias.
          </p>
          <p>
            A posse de animais fora dessa lista pode render multas de R$
            500 a R$ 5.000 por animal, apreensão imediata e, em casos de
            tráfico, detenção de seis meses a um ano. E nunca compre de
            vendedor irregular: adquirir animais de origem ilegal alimenta
            o tráfico de animais silvestres, considerado o terceiro maior
            mercado ilícito do mundo — atrás apenas do tráfico de drogas e
            de armas.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Cuidados;
